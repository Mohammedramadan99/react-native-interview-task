import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { faker } from '@faker-js/faker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  type ListRenderItemInfo,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';

// Types
interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
  };
}

// Constants
const INITIAL_BATCH_SIZE = 50;
const BATCH_SIZE = 20;
const TOTAL_ITEMS = 10000;

// Memoized Components
const UserCard = React.memo(({ user }: { user: User }) => (
  <ThemedView style={styles.userCard}>
    <Image
      source={{ uri: user.picture.thumbnail }}
      style={styles.avatar}
      loading="lazy"
      defaultSource={require('../../assets/images/icon.png')}
    />
    <ThemedView style={styles.userInfo}>
      <ThemedText style={styles.name}>
        {user.name.first} {user.name.last}
      </ThemedText>
      <ThemedText style={styles.email}>{user.email}</ThemedText>
      <ThemedText style={styles.location}>
        {user.location.city}, {user.location.country}
      </ThemedText>
    </ThemedView>
  </ThemedView>
));

UserCard.displayName = 'UserCard';

// Utility functions
const generateFakeUsers = (count: number): User[] => {
  console.time('generateUsers');
  const users = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
    },
    email: faker.internet.email(),
    picture: {
      thumbnail: faker.image.avatar(),
    },
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
  }));
  console.timeEnd('generateUsers');
  return users;
};

export default function SolutionScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Generate all users at once but load them in batches
  const allUsers = useMemo(() => generateFakeUsers(TOTAL_ITEMS), []);

  // Initial load
  useEffect(() => {
    setUsers(allUsers.slice(0, INITIAL_BATCH_SIZE));
    setLoading(false);
  }, [allUsers]);

  // Optimized render item function
  const renderItem = useCallback(({ item }: ListRenderItemInfo<User>) => (
    <UserCard user={item} />
  ), []);

  // Optimized key extractor
  const keyExtractor = useCallback((item: User) => item.id, []);

  // Load more items when reaching end of list
  const loadMore = useCallback(() => {
    if (loadingMore || users.length >= TOTAL_ITEMS) return;

    setLoadingMore(true);
    const nextBatch = allUsers.slice(
      users.length,
      Math.min(users.length + BATCH_SIZE, TOTAL_ITEMS)
    );

    setUsers(prevUsers => [...prevUsers, ...nextBatch]);
    setLoadingMore(false);
  }, [loadingMore, users.length, allUsers]);

  // Performance monitoring
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { velocity } = event.nativeEvent;
      if (velocity && Math.abs(velocity.y) > 0) {
        console.log(`Scroll velocity: ${velocity.y.toFixed(2)} pixels/second`);
      }
    },
    []
  );

  // Loading footer
  const ListFooterComponent = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <ThemedView style={styles.footer}>
        <ActivityIndicator size="small" />
        <ThemedText style={styles.footerText}>Loading more...</ThemedText>
      </ThemedView>
    );
  }, [loadingMore]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>
          Preparing optimized view...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlashList
      data={users}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={100}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
      onScroll={onScroll}
      scrollEventThrottle={16}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 10,
  },
  userCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: 10,
  },
});
