import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';

export default function Dashboard({ route, navigation }) {
  const email = route?.params?.email || 'Guest';

  return (
    <ImageBackground
      source={require('../assets/images/background_img.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(8,16,131,0.8)"
      />
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLogo}>RDJ</Text>
          <View style={styles.headerRight}>
            <Text style={styles.welcomeText}>Welcome, {email}</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>
              ML-Powered Clog Detection System
            </Text>

            {/* System Status Card */}
            <View style={styles.statusCard}>
              <Text style={styles.cardTitle}>System Status</Text>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, styles.statusOnline]} />
                <Text style={styles.statusText}>System Online</Text>
              </View>
              <View style={styles.statusList}>
                <Text style={styles.statusItem}>● No clogs detected</Text>
                <Text style={styles.statusItem}>● Flow rate: Normal</Text>
                <Text style={styles.statusItem}>
                  ● Last check: 2 minutes ago
                </Text>
                <Text style={styles.statusItem}>● Sensors: 4/4 active</Text>
              </View>
            </View>

            {/* Quick Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Monitoring</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>99.2%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.activityCard}>
              <Text style={styles.cardTitle}>Recent Activity</Text>
              <View style={styles.activityItem}>
                <Text style={styles.activityTime}>2 min ago</Text>
                <Text style={styles.activityText}>
                  System scan completed - No issues found
                </Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityTime}>15 min ago</Text>
                <Text style={styles.activityText}>Flow rate normalized</Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityTime}>1 hour ago</Text>
                <Text style={styles.activityText}>
                  Routine maintenance check
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 16, 90, 0.45)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#081083',
  },
  headerLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  mainContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 24,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  statusCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 16,
    color: '#081083',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusOnline: {
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081083',
  },
  statusList: {
    gap: 8,
  },
  statusItem: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#081083',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#081083',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activityCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    width: 70,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
