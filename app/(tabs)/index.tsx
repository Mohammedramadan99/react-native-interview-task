import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, ScrollView } from 'react-native';



export default function InstructionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.title}>Performance Optimization Task</ThemedText>

        <ThemedText style={styles.sectionTitle}>Overview</ThemedText>
        <ThemedText style={styles.text}>
          This task evaluates your ability to identify and resolve performance issues in a React Native application.
          You will be working with a list of 10,000 user profiles that currently experiences performance issues.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Current Implementation</ThemedText>
        <ThemedText style={styles.text}>
          • The Exercise tab contains a ScrollView with 10,000 user profiles
          • Each profile includes an avatar image and user details
          • The current implementation causes noticeable performance issues
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Your Task</ThemedText>
        <ThemedText style={styles.text}>
          1. Identify Performance Issues:
          • Use Expo Performance Monitor (Shake device → Show Performance Monitor)
          • Document observed issues (FPS drops, memory usage, etc.)
          • Identify specific bottlenecks in the current implementation

          2. Implement Optimizations:
          • Replace ScrollView with a more efficient solution
          • Implement proper list virtualization
          • Optimize image loading and rendering
          • Handle memory management effectively

          3. Testing Requirements:
          • Test on both high-end and low-end devices
          • Ensure smooth scrolling (target 60 FPS)
          • Monitor and optimize memory usage
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Expected Optimizations</ThemedText>
        <ThemedText style={styles.text}>
          • Implementation of FlatList or similar virtualized list
          • Proper implementation of item rendering optimization
          • Effective memory management strategies
          • Image loading optimization
          • Performance monitoring implementation
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Evaluation Criteria</ThemedText>
        <ThemedText style={styles.text}>
          • Code quality and organization
          • Performance improvements achieved
          • Understanding of React Native performance concepts
          • Explanation of optimization strategies
          • Testing approach and results
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
