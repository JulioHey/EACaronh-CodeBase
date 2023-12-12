import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, FlatList, View } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ThemeContext} from "../../store/context/theme";

const Dropdown = ({ data, onSelect, label }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);

  const {appTheme} = useContext(ThemeContext);

  const onItemPress = (item): void => {
     setSelected(item);
     onSelect(item);
     setVisible(false);
   };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={styles.buttonText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    if (visible) {
      return (
            <Modal visible={visible} transparent animationType="none">
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setVisible(false)}
              >
                <View style={[styles.dropdown, {top: dropdownTop}]}>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          );
    }
  };

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: appTheme.borderRadius.s,
      backgroundColor: appTheme.color.lightBackground,
      paddingHorizontal: appTheme.spacing.xl,
      height: appTheme.size.full,
      width: appTheme.size.full,
      paddingHorizontal: 10,
      zIndex: 1,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: appTheme.color.lightBackground,
      paddingHorizontal: appTheme.spacing.xl,
      borderRadius: appTheme.borderRadius.s,
      fontSize: appTheme.font.size.xl,
      lineHeight: appTheme.font.lineHeight.xl,
      width: "100%",
    },
    dropdown: {
      //position: 'absolute',
      backgroundColor: '#fff',
      top: 50,
      width: "100%"
    },
    item: {
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    overlay: {
      width: "100%",
      height: "100%"
    }
  });


  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{selected || label}</Text>
      <MaterialIcons name="keyboard-arrow-down"
                              size={appTheme.font.size.xxl}
                              color={appTheme.color.darkBackground}
                              style={{
                                  position: "absolute",
                                  right: appTheme.spacing.m,
                                  top: appTheme.spacing.m,
                                  cursor: "pointer",
                              }}/>
    </TouchableOpacity>
  );
}


export default Dropdown;
