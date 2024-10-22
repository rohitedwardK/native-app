import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import the background image from the assets folder
const backgroundImage = require('../../assets/app-bg-grey.png');

export default function ProfileDetailsScreen() {

  const navigation = useNavigation<any>();

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle password update
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Logic to update the password goes here
    alert("Password updated successfully!");
  };

  // Expansion states for sections
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(true);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);

  const toggleContactInfo = () => setIsContactInfoExpanded(!isContactInfoExpanded);
  const toggleSettings = () => setIsSettingsExpanded(!isSettingsExpanded);

  return (
    <View style={styles.container}>
        <ImageBackground
        source={backgroundImage} // Use image from assets
        style={styles.backgroundImage} // Apply only valid styles here
        resizeMode="cover" // Use resizeMode directly on ImageBackground
        >
        
          {/* User Profile Section */}
          <View style={styles.wrapper}>
              <View style={styles.profileSection}>
                  <Image
                  source={require('../../assets/profile-pic.png')} // Your profile picture image path
                  style={styles.profilePic}
                  />
                  <Text style={styles.fullName}>John Doe</Text> {/* Replace with dynamic name */}
              </View>
          </View>

          {/* Expandable Contact Info Section */}
          <View style={styles.contentContainer}>
              <View style={styles.contentWrapper}>
                  <View style={styles.collapsable}>
                      <Pressable 
                          onPress={toggleContactInfo} 
                          style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          padding: 10,
                          borderRadius: 8,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          }}
                      >
                          <View style={styles.toggleTitle}>
                              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold'  }}>Contact Info</Text>
                              <MaterialIcons name="edit"
                              style= {{
                                  color: "#000",
                                  paddingLeft: 10,
                                  fontSize: 16,
                                  fontWeight: 'bold' 
                              }}/>
                          </View>
                          {/* Icon with Rounded Background */}
                          <View style={{
                              backgroundColor: '#fff', 
                              padding: 4, 
                              borderRadius: 50, // Fully rounded background
                              alignItems: 'center', 
                              justifyContent: 'center'
                              }}>
                              <MaterialIcons 
                                  name={isContactInfoExpanded ? 'expand-less' : 'expand-more'} 
                                  size={24} 
                                  color="#000" 
                          />
                          </View>
                      </Pressable>
                      {isContactInfoExpanded && (
                          <View style={styles.section}>
                              <View style={styles.infoRow}>
                                  <View style={styles.iconBg}>
                                      <MaterialIcons name="person" size={18} color="white" />
                                  </View>
                                  <Text style={styles.infoTitle}>Full Name:</Text>
                                  <Text style={styles.infoValue}>John Doe</Text>
                              </View>
                              <View style={styles.infoRow}>
                                  <View style={styles.iconBg}>
                                      <MaterialIcons name="phone" size={18} color="white" />
                                  </View>
                                  <Text style={styles.infoTitle}>Mobile:</Text>
                                  <Text style={styles.infoValue}>+1234567890</Text>
                              </View>
                              <View style={styles.infoRow}>
                                  <View style={styles.iconBg}>
                                      <MaterialIcons name="email" size={18} color="white" />
                                  </View>
                                  <Text style={styles.infoTitle}>Email:</Text>
                                  <Text style={styles.infoValue}>johndoe@email.com</Text>
                              </View>
                          </View>
                      )}
                  </View>
                  
                  <View style={styles.collapsable}>
                      {/* Settings Section */}
                      {/* Expandable Settings Section */}
                      <Pressable 
                          onPress={toggleSettings} 
                          style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          padding: 10,
                          borderRadius: 8,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          }}
                      >
                          <View style={styles.toggleTitle}>
                              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Settings</Text>
                          </View>
                          {/* Icon with Rounded Background */}
                          <View style={{
                              backgroundColor: '#fff', 
                              padding: 4, 
                              borderRadius: 50, // Fully rounded background
                              alignItems: 'center', 
                              justifyContent: 'center'
                              }}>
                              <MaterialIcons 
                                  name={isSettingsExpanded ? 'expand-less' : 'expand-more'} 
                                  size={24} 
                                  color="#000" 
                          />
                          </View>
                      </Pressable>
                      {isSettingsExpanded && (
                          <View style={styles.section}>
                              <View style={styles.passwordSection}>
                                  <Text style={styles.info}>Current Password</Text>
                                  <TextInput 
                                      style={styles.input} 
                                      value={currentPassword} 
                                      onChangeText={setCurrentPassword} 
                                      secureTextEntry 
                                      placeholder="Enter current password" 
                                      placeholderTextColor="#888"
                                  />
                                  
                                  <Text style={styles.info}>New Password</Text>
                                  <TextInput 
                                      style={styles.input} 
                                      value={newPassword} 
                                      onChangeText={setNewPassword} 
                                      secureTextEntry 
                                      placeholder="Enter new password" 
                                      placeholderTextColor="#888"
                                  />
                                  
                                  <Text style={styles.info}>Confirm New Password</Text>
                                  <TextInput 
                                      style={styles.input} 
                                      value={confirmPassword} 
                                      onChangeText={setConfirmPassword} 
                                      secureTextEntry 
                                      placeholder="Confirm new password" 
                                      placeholderTextColor="#888"
                                  />
                                  
                                  {/* Custom Button */}
                                  <Pressable style={styles.updateButton} onPress={handleUpdatePassword}>
                                      <Text style={styles.updateButtonText}>Update Password</Text>
                                  </Pressable>
                              </View>
                          </View>
                      )}
                  </View>
              </View>
          </View>
        </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
        flex: 1, // Ensures the image fills the screen
        width: '100%', // Width matches viewport
        height: '100%', // Height matches viewport
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  wrapper: { // Dark background
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentWrapper: {

  },
  section: {
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: "bold"
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'grey',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  infoTitle: {
    color: '#888',
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    color: '#111', // Light gray for values
    fontSize: 14,
    textAlign: 'right',
  },
  info: {
    fontSize: 12,
    color: '#111', // Adjust color as needed
    marginBottom: 8
  },
  passwordSection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#333', // Text color for input
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: 'white', // Adjust color as needed
  },
  contactInfoHeader: {
    flexDirection: 'row',
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    color: 'white',
  },
  profileSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
    marginRight: 15
  },
  fullName: {
    fontSize: 24, // Larger font for the full name
    color: 'white', // Adjust color as needed
    marginTop: 10,
    fontWeight: 600,
  },
  updateButton: {
    backgroundColor: 'rgb(16 236 109)',
    fontWeight: 600,
    color: '#111',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  updateButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  iconBg: {
    backgroundColor: '#757575', 
    padding: 5, 
    borderRadius: 50, // Fully rounded background
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: 110
  },
  collapsable: {
    marginBottom: 5
  }
});
