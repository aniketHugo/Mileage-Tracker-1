import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
        <Text>Toggle Sidebar</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text>Main Content of the Page</Text>
      </View>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text>Sidebar Content</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999, // Ensure the button stays on top
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '75%',
    backgroundColor: '#fff',
    zIndex: 998, // Render sidebar above content
  },
});

export default Sidebar;
