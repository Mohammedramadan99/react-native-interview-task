import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';

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

export default function ExerciseScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Starting to generate users...');
    const fakeUsers = generateFakeUsers(100);
    console.log(`Generated ${fakeUsers.length} users`);
    setUsers(fakeUsers);
    setLoading(false);
  }, []);

  console.log('Current state:', { loading, userCount: users.length });

  if (loading || users.length === 0) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>
          {loading ? 'Generating users...' : 'Loading view...'}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {users.map((user, index) => (
        <ThemedView key={`${user.id}-${index}`} style={styles.userCard}>
          <Image
            source={{ uri: user.picture.thumbnail }}
            style={styles.avatar}
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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
