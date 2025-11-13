import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

export default function Landing({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/background_img.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {/* Header/Navbar */}
        <View style={styles.navbar}>
          <Text style={styles.navbarLogo}>RDJ</Text>
          <View style={styles.navbarLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.navbarLink}>Login</Text>
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
            <Text style={styles.mainTitle}>
              THE DEVELOPMENT OF A MACHINE LEARNING-POWERED CLOG DETECTION
              SYSTEM
            </Text>

            {/* Feature Image Section */}
            <View style={styles.imageSection}>
              <View style={styles.featureImageContainer}>
                <View style={styles.featureImagePlaceholder}>
                  <Text style={styles.featureImageText}>System Diagram</Text>
                </View>
              </View>
            </View>

            {/* Background Section */}
            <View style={styles.backgroundSection}>
              <Text style={styles.backgroundTitle}>
                Background of the Study
              </Text>
              <Text style={styles.backgroundText}>
                The Philippines is a tropical country that frequently
                experiences heavy rainfall and an average of 20 tropical
                cyclones. This indicates that the Philippines is prone to
                experience flooding, especially in continuous occurrence of
                inclement weather conditions.
                {'\n\n'}
                Developing regions in the Philippines, including Region VI focus
                their efforts on urbanization and infrastructure development.
                One of the challenges faced by urbanization includes
                uncontrolled flooding resulting in flood loss.
                {'\n\n'}
                Hence, the proponents aim to develop a machine learning-powered
                clog and flow rate flood detection system.
              </Text>
            </View>

            {}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.primaryButtonText}>Login</Text>
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
  navbar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#081083',
    zIndex: 1000,
  },
  navbarLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  navbarLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  navbarLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    marginTop: 100, // Account for navbar
  },
  contentContainer: {
    paddingBottom: 40,
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 24,
    lineHeight: 32,
  },
  imageSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  featureImageContainer: {
    width: '90%',
    maxWidth: 400,
    aspectRatio: 16 / 10,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.55,
    shadowRadius: 48,
    elevation: 20,
  },
  featureImagePlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  featureImageText: {
    fontSize: 18,
    color: '#081083',
    fontWeight: '600',
  },
  backgroundSection: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  backgroundTitle: {
    fontSize: 20,
    color: '#081083',
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  backgroundText: {
    fontSize: 14,
    color: '#081083',
    lineHeight: 22,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#081083',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#081083',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
