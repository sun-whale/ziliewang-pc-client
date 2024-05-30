/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
// 简历完善度、
export function getPerfectionDegree(data) {
  let infoData = data;
  let perfection_degree = {};
  let num = 0;
  let basic_info_num = 0;
  // 基础信息
  let basic_info = {};
  basic_info.avatar =  infoData.basic_info.avatar; // 头像
  basic_info.advantages_highlights =  infoData.basic_info.advantages_highlights; // 优势亮点
  basic_info.begin_work_date =  infoData.basic_info.begin_work_date; // 参加工作时间
  basic_info.real_phone =  infoData.basic_info.real_phone; // 电话
  basic_info.real_email =  infoData.basic_info.real_email; // 邮箱
  if(basic_info.avatar){
    num += 1;
  }else{
    basic_info_num += 1
  }

  if(basic_info.advantages_highlights){
    num += 1;
  }else{
    basic_info_num += 1
  }

  if(basic_info.begin_work_date){
    num += 1;
  }else{
    basic_info_num += 1
  }

  if(basic_info.real_phone){
    num += 1;
  }else{
    basic_info_num += 1
  }
  
  if(basic_info.real_email){
    num += 1;
  }else{
    basic_info_num += 1
  }
  //求职期望
  let job_expectation = infoData.job_expectation;
  //工作经历
  let work_experience = infoData.work_experience;
  //项目经历
  let project_experience = infoData.project_experience;
  //教育经历
  let education_experience = infoData.education_experience;
  if(job_expectation.length > 0){
    num += 1;
  }
  if(work_experience.length > 0){
    num += 1;
  }
  if(project_experience.length > 0){
    num += 1;
  }
  if(education_experience.length > 0){
    num += 1;
  }
  let degree_num = Number(num*100)/9;
  perfection_degree = {
    degree_num: degree_num.toFixed(0),
    basic_info_num,
    basic_info,
    job_expectation,
    work_experience,
    project_experience,
    education_experience
  }
  return perfection_degree
}
