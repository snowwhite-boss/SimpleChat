import React from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  mainButtonStyle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
});

const IconButton = ({ onPress, buttonStyle, buttonImageStyle, underlayColor, source }) => {
  const { mainButtonStyle, mainButtonImageStyle } = styles;
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={underlayColor}
      style={[mainButtonStyle, buttonStyle]}
    >
      <Image
        source={source}
        style={[mainButtonImageStyle, buttonImageStyle]}
      />
    </TouchableHighlight>
  );
};

// IconButton.propTypes = {
//   onPress: PropTypes.func,
//   buttonStyle: PropTypes.any,
//   buttonImageStyle: PropTypes.any,
//   underlayColor: PropTypes.string,
//   source: PropTypes.number.isRequired,
// };

IconButton.defaultProps = {
  onPress: () => {},
  buttonStyle: {},
  buttonImageStyle: {},
  underlayColor: 'rgba(255,255,255,0.3)',
};

export default IconButton;
