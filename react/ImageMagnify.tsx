/**
 * React 图片放大预览组件
 * 这种组件其实使用 DOM 操作可能更好一点，结合 requestAnimationFrame
 */
import React, { PureComponent } from 'react';
import { Popover } from 'tezign-ui';
import classNames from "classnames";

import './ImageMagnify.scss';

interface Props {
  src?: string;
  url: string;
}

interface State {
  loaded: boolean; // 图片是否加载完成
  inner: boolean; // 鼠标是否在框的内部
  left: number; // 目标元素相对于页面左侧的位置
  top: number; // 目标元素相对于页面顶部的位置
  mouseX: number; // 鼠标相对于目标元素左侧的距离
  mouseY: number; // 鼠标相对于目标元素顶部的距离
  imgCoordX1: number; // 图片在 div 内部的位置
  overviewLeft: number; // 小框的定位
  overviewTop: number; // 小框的定位
}

const BOX_WIDTH = 218;
const BOX_HEIGHT = 162;

// const OVERLAY_WIDTH = 320;
// const OVERLAY_HEIGHT = 320;
const OVERLAY_SIZE = 320;


function getOverviewLeftAndTop(x: number, y: number, overviewSize: number) {
  const overviewLeft = x - overviewSize / 2;
  const overviewTop = y - overviewSize / 2;
  const overviewRight = x + overviewSize / 2;
  const overviewBottom = y + overviewSize / 2;
  let left = overviewLeft, top = overviewTop;
  if (overviewRight >= BOX_WIDTH) {
    left = BOX_WIDTH - overviewSize
  }
  if (overviewBottom >= BOX_HEIGHT) {
    top = BOX_HEIGHT - overviewSize
  }
  if (overviewLeft < 0) {
    left = 0
  }
  if (overviewTop < 0) {
    top = 0
  }
  return {
    left, top
  }
}

// 计算放大后的图片的属性
function getBGP(x1: number, imgDisplayHeight: number, imgDisplayWidth: number, overviewTop: number, overviewLeft: number) {
  let backgroundPositionY = '0';
  let backgroundPositionX = '0';
  // 图片的宽度小于图片的高度，则图片框上下滑动
  if (imgDisplayWidth < BOX_HEIGHT) {
    backgroundPositionY = overviewTop / (BOX_HEIGHT - imgDisplayWidth) * 100 + '%';
  }
  // 图片的宽度大于图片的高度，则图片框左右滑动
  if (imgDisplayWidth > BOX_HEIGHT) {
    // 图片的宽度占满
    if (imgDisplayWidth >= BOX_WIDTH) {
      console.log("图片的宽度占满");
      backgroundPositionX = overviewLeft / (BOX_WIDTH - imgDisplayHeight) * 100 + '%';
    } else {
      // 图片的宽度未占满
      console.log("图片的宽度未占满");
      backgroundPositionX = Math.min(Math.max(overviewLeft - x1, 0), imgDisplayWidth - BOX_HEIGHT) / (imgDisplayWidth - BOX_HEIGHT) * 100 + '%';
    }
  }
  return {
    backgroundPositionX,
    backgroundPositionY,
  }
}

export default class ImageMagnify extends PureComponent<Props, State> {
  divRef: React.RefObject<HTMLDivElement>;

  magnification: number; // 放大倍数
  overviewSize: number; // 预览大小
  imgDisplayHeight: number; // 图片的展示高，在 render 中使用，所以缓存在这里
  imgDisplayWidth: number; // 图片的展示宽

  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
      inner: false,
      left: 0,
      top: 0,
      mouseX: 0,
      mouseY: 0,
      imgCoordX1: 0,
      overviewLeft: 0,
      overviewTop: 0,
    }

    this.imgDisplayHeight = 0;
    this.imgDisplayWidth = 0;
    this.divRef = React.createRef<HTMLDivElement>();
    this.magnification = 2; // 默认放大倍数是2
    this.overviewSize = OVERLAY_SIZE / this.magnification;
  }

  onLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    const { naturalHeight, naturalWidth } = target;
    // console.log('naturalHeight, naturalWidth', naturalHeight, naturalWidth);

    if (naturalHeight && naturalWidth) {
      this.setState({ loaded: true });

      const rate = naturalHeight / naturalWidth;
      const boxRate = BOX_HEIGHT / BOX_WIDTH;
      // console.log('rate', rate);
      let imgDisplayWidth = BOX_WIDTH, imgDisplayHeight = BOX_HEIGHT;
      if (rate > boxRate) {
        imgDisplayWidth = BOX_WIDTH * boxRate / rate;
        const x1 = (BOX_WIDTH - imgDisplayWidth) / 2;
        this.setState({ imgCoordX1: x1 })
      } else {
        imgDisplayHeight = BOX_HEIGHT * rate / boxRate;
      }
      this.imgDisplayHeight = imgDisplayHeight;
      this.imgDisplayWidth = imgDisplayWidth;
      // 根据图片比例设定放大倍数
      // console.log('imgDisplayWidth, imgDisplayHeight', imgDisplayWidth, imgDisplayHeight);
      this.overviewSize = Math.min(imgDisplayWidth, imgDisplayHeight);
      this.magnification = OVERLAY_SIZE / this.overviewSize;
      // console.log('this.magnification', this.magnification);
      // console.log('this.overviewSize', this.overviewSize);
    }
  }

  handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { loaded } = this.state;
    if (!loaded) {
      return 
    }
    const current = this.divRef.current;
    if (current) {
      const rect = current.getBoundingClientRect();
      console.log('rect', rect);
      const { left, top } = rect;
      this.setState({ inner: true, left, top });
    }
  }

  handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { loaded } = this.state;
    if (!loaded) {
      return 
    }
    this.setState({ inner: false });
  }

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { inner, left, top } = this.state;
    if (!inner) {
      return 
    }
    // console.log('event', event);
    const { clientX, clientY } = event;
    // console.log('clientX, clientY', clientX, clientY);
    const x = clientX - left + 1;
    const y = clientY - top + 1;
    // console.log('x, y', x, y);
    const { left: overviewLeft, top: overviewTop } = getOverviewLeftAndTop(x, y, this.overviewSize);
    this.setState({ overviewLeft, overviewTop })
  }

  render() {
    const { src, url } = this.props;
    const { inner, overviewLeft, overviewTop, imgCoordX1 } = this.state;

    const { backgroundPositionX, backgroundPositionY } = getBGP(imgCoordX1, this.imgDisplayHeight, this.imgDisplayWidth, overviewTop, overviewLeft);
    // console.log('backgroundPositionY, backgroundPositionY');

    return <Popover
      // visible
      className="detection_card_asset_info_popover"
      destroyTooltipOnHide
      placement="right"
      content={<div className="asset_img_bg">
        <div className="magnify-overlay" style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: `${this.imgDisplayWidth * this.magnification}px ${(this.imgDisplayHeight) * this.magnification}px`,
          backgroundPositionX,
          backgroundPositionY,
        }} />
      </div>}>
      <div
        ref={this.divRef}
        className='position-relative magnify-box'
        style={{ width: 218, height: 162 }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <img className='img-magnify' src={src} alt="" onLoad={this.onLoad} />
        <div className={classNames("img-overview-box border-all position-absolute", {
          "display-none": !inner
        })} style={{
          width: this.overviewSize, height: this.overviewSize,
          top: overviewTop, left: overviewLeft
        }} />
      </div>
    </Popover>
  }
}
