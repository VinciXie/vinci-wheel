function get_current_time() {
    // "Wed Aug 02 2017 14:04:09 GMT+0800 (中国标准时间)"
    let time1 = (new Date()).toLocaleDateString()
    let time2 = (new Date()).toTimeString().slice(0, 8)
    let time0 = time1 + " " + time2
    console.log('time0', time0);
    return time0
}



function time_from_id(id) {
  // body...
  let id8 = id.slice(0, 8)
  let ts = parseInt(id8, 16)
  var t,y,m,d,h,i,s;
  t = ts ? new Date(ts * 1000) : new Date();
  y = t.getFullYear(); // 年
  m = t.getMonth() + 1; // 月
  d = t.getDate(); // 日
  h = t.getHours();
  i = t.getMinutes();
  s = t.getSeconds();
  // 可依据须要在这里定义时间格式
  return (d < 10 ? '0' + d : d) + '/' + (m < 10 ? '0' + m : m) + '/' + y +
          ' ' + (h < 10 ? '0' + h : h) + ':' +
          (i < 10 ? '0' + i : i) + ':' + ( s < 10 ? '0' + s : s)
}



function isUnixTime(time) {
  // console.log('time', time);
  let _time = time.toString()
  // console.log('_time', _time);
  if (_time.length == 10 && _time.startsWith('1')) {
    return true;
  }
  return false;
}

/**
 * 获取时间和日期
 * @param  {Number} dataString [description]
 * @return {String}            [description]
 */
function getDateAndTime(dataString) {
  if (dataString == undefined) {
    return ''
  }
  if (isUnixTime(dataString)) {
    // console.log('dataString', dataString);
    dataString = dataString * 1000
  }
  var d = new Date(dataString)
  return d.toLocaleDateString() + ' ' + d.toTimeString().slice(0, 8)
}

/**
 * @return {string} example 2019年3月5日07:00
 */
function getTime(str) {
  const d = new Date(str)
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  const date = y + '年' + m + '月' + day
  let time = d.toTimeString().substr(0, 5)
  return date + '日' + time
}

function get_chinese_time(date) {
    if (date == '') {
        // 没有输入
        date = get_current_time()
    }

}


function to_English_time(origin_date) {
    let dt = new Date(origin_date)
    let date = dt.toString()
    console.log('date.slice(4)', date.slice(4, 24));

}


function get_time_second() {
  let ms = (new Date()).getTime()
  return parseInt(ms.toString().slice(0, -3))
}

function get_ms_short() {
  let ms = (new Date()).getTime()
  return parseInt(ms.toString().slice(8))
}


function secondFormat(s) {
  let minute = Math.ceil(s / 60)
  let hour = Math.floor(minute / 60)
  let leftMinute = minute % 60
}


/**
 * [Timeout_detect description]
 */
class Timeout_detect {
  constructor(long) {
    this.long = long != undefined ? long * 1000 : 5000
    this.timer = undefined;
    this.ref = null;
  }

  detect(func) {

    if (this.timer != undefined) return ;

    this.timer = window.setTimeout(func.bind(this), this.long);
  }

  detect_close(callback) {
    if (this.timer != undefined) {
      window.clearTimeout(this.timer)
      this.timer = undefined;
      if (callback) {
        callback()
      }
    }
  }

}



// to_English_time("2017/8/2 13:47:21")
export { get_time_second, get_ms_short, Timeout_detect, time_from_id }
