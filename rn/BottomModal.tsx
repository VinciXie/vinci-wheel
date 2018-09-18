// 一个从底部升起的 Modal
// 1. 具有半透明深色背景
// 2. 点击背景触发关闭事件
import React, { PureComponent } from 'react'
import { View, Modal, StyleSheet, Dimensions, ModalProps, ViewStyle, TouchableWithoutFeedback } from 'react-native'

const { height } = Dimensions.get('window')

interface Props extends ModalProps {
  style?: ViewStyle;
}

class BottomModal extends PureComponent<Props> {

  handleShow = () => {
    // const { onShow } = this.props
    // if (onShow) onShow()
    // console.log('handleShow')
  }

  handlePressClose = () => {
    const { onRequestClose } = this.props
    if (onRequestClose) onRequestClose()
  }

  render() {
    const { children, style, ..._props } = this.props
    return (
      <Modal transparent={true} animationType='slide' {..._props}>
        <TouchableWithoutFeedback onPress={this.handlePressClose}>
          <View style={styles.modalBackgroud} />
        </TouchableWithoutFeedback>
        <View style={[styles.modal, style]}>
          {children}
        </View>
      </Modal>
    )
  }
}

export default BottomModal

interface Styles {
  modalBackgroud: ViewStyle;
  modal: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modalBackgroud: {
    flex: 1,
    height,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    position: 'absolute',
    height: 200,
    width: '100%',
    bottom: 0,
    backgroundColor: '#F7F8FA',
  }
})
