
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Text, Modal, StyleSheet } from 'react-native'
import { InputItem, Toast } from 'antd-mobile-rn'

const inputHeight = 445
const bgh = global.ScreenHeight - inputHeight

const styles = StyleSheet.create({
  headerView: {
    height: 44, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
  },
  backImageStyle: {
    padding: 2,
    width: 31,
    height: 16,
    marginLeft: 18
  },
  title: { fontSize: 18, color: '#000000' },
  inputText: {
    marginTop: 24,
    width: global.ScreenWidth - 60,
    height: 48,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF'
  }
})

class BTPasswordModal extends Component {
  constructor(props) {
    super(props)
    console.log('BTPasswordModal props: ', props)
    this.state = {
      password: '',
    }
  }

  recover = () => {
    const password = this.state.password
    if (password == '') return Toast.fail(('transfer.please_input_password'), global.ToastTime)
  }

  render() {
    const { onCancel, visible, onModalClose, onConfirm, title, ...rest } = this.props
    return (
      <Modal transparent={true} visible={visible} onRequestClose={onModalClose}>
        <TouchableOpacity onPress={onCancel} style={{ height: bgh, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />

        <View style={{ height: inputHeight, backgroundColor: 'white' }}>

          <View style={styles.headerView}>
            <TouchableOpacity style={styles.backImageStyle} onPress={onCancel}>
              <Image source={require('../Public/img/back_arr_black.png')} style={{ width: 25, height: 12 }} />
            </TouchableOpacity>
            <Text style={styles.title}>{title || ('transfer.please_input_password')}</Text>
            <TouchableOpacity style={{ width: 44, height: 44, justifyContent: 'center' }} onPress={this.recover}>
              <Text style={{ color: '#007AFF' }}>{('Other_Sure')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#CFCFCF', height: 0.5 }} />

          <InputItem
            style={styles.inputText}
            type="password"
            placeholder={('transfer.please_input_password')}
            clear={true}
            onVirtualKeyboardConfirm={this.recover}
            autoFocus
            onChange={(value) => this.setState({ password: value })}
            {...rest}
          />
        </View>
      </Modal>
    )
  }
}

BTPasswordModal.defaultProps = {
  onModalClose: () => {},
  onCancel: () => {}, // 点击关闭按钮时触发
  onConfirm: () => {},
}

BTPasswordModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onModalClose: PropTypes.func,
  onConfirm: PropTypes.func,
  keystoreStr: PropTypes.string.isRequired,
}

export default BTPasswordModal
