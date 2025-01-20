import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { faker } from '@faker-js/faker';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';

// Step 1: Define what our user data looks like
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

// Step 2: Create a simple component for each user card
const UserCard = React.memo(({ user }: { user: User }) => (
  <ThemedView style={styles.userCard}>
    <Image
      source={{ uri: user.picture.thumbnail }}
      style={styles.avatar}
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

// Step 3: Function to generate fake users
const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
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
};

export default function Solution2Screen() {
  // Step 4: Set up our state
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Step 5: Generate all users once and load initial batch
  useEffect(() => {
    console.log('Generating all users...');
    // Generate all 10,000 users at once
    const generatedUsers = generateFakeUsers(10000);
    setAllUsers(generatedUsers);
    
    // Only show first 50 items initially
    setUsers(generatedUsers.slice(0, 50));
    setLoading(false);
    console.log('Initial load complete');
  }, []);

  // Step 6: Function to load more items from existing data
  const loadMore = useCallback(() => {
    if (loadingMore || users.length >= allUsers.length) return;

    setLoadingMore(true);
    console.log(`Loading more items from ${users.length} to ${users.length + 20}`);

    // Load next 20 items from our existing data
    setTimeout(() => {
      setUsers(currentUsers => [
        ...currentUsers,
        ...allUsers.slice(currentUsers.length, currentUsers.length + 20)
      ]);
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, users.length, allUsers]);

  // Step 7: Loading states
  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading users...</ThemedText>
      </ThemedView>
    );
  }

  // Step 8: Render the optimized list
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserCard user={item} />}
      keyExtractor={item => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" />
            <ThemedText style={styles.footerText}>Loading more...</ThemedText>
          </View>
        ) : null
      }
      // Performance optimizations:
      removeClippedSubviews={true}  // Removes items that are off screen
      maxToRenderPerBatch={10}      // Limits the number of items rendered per batch
      initialNumToRender={10}       // Initial number of items to render
      windowSize={5}                // Reduces the window of items kept mounted
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
    backgroundColor: 'transparent',
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
