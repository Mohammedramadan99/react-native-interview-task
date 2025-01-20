# React Native Performance Optimization Interview Task

This project is designed to assess a candidate's ability to identify and resolve performance issues in a React Native application using Expo.

## Task Overview

The application contains a list of 10,000 user profiles that currently experiences performance issues. Candidates are expected to optimize the implementation while maintaining functionality.

### Setup Instructions

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

### Task Structure

The app contains two main tabs:
- **Instructions**: Detailed task requirements and evaluation criteria
- **Exercise**: The unoptimized implementation that needs to be improved

### Current Implementation

- Uses ScrollView to render 10,000 user profiles
- Each profile includes an avatar image and user details
- Data is fetched from the Random User Generator API
- Known performance issues: laggy scrolling and memory spikes

### Expected Optimizations

1. Replace ScrollView with a more efficient solution (e.g., FlatList)
2. Implement proper list virtualization
3. Optimize image loading and rendering
4. Handle memory management effectively
5. Add performance monitoring

### Evaluation Criteria

- Code quality and organization
- Performance improvements achieved
- Understanding of React Native performance concepts
- Explanation of optimization strategies
- Testing approach and results

### Performance Testing

- Use Expo Performance Monitor (Shake device → Show Performance Monitor)
- Test on both high-end and low-end devices
- Monitor FPS and memory usage
- Document performance improvements

## Time Allocation

- Setup and familiarization: 10 minutes
- Implementation: 40 minutes
- Testing and documentation: 10 minutes

## Notes for Interviewers

- Observe the candidate's approach to problem-solving
- Pay attention to their understanding of React Native performance concepts
- Note their ability to explain technical decisions
- Consider their testing methodology
