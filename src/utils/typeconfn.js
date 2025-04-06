// 通用转换函数：根据类型在数组和字符串之间自动转换
export function convertFormData(formData, keys) {
  const convertedData = { ...formData }; // 复制 formData 对象
  keys.forEach((key) => {
    const value = formData[key]; // 获取 formData 对应的值
    if (Array.isArray(value)) {
      convertedData[key] = value.join(",");
    } else if (typeof value === "string") {
      convertedData[key] = value.split(",").map(Number);
    } else {
      convertedData[key] = [];
    }
  });
  return convertedData;
}


// 时间转换函数
export function formatTimeRange(timeRange) {
  if (!timeRange || timeRange.length === 0) {
    return "";
  }

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [startTime, endTime] = timeRange;
  return `${formatTime(new Date(startTime))},${formatTime(new Date(endTime))}`;
}

// 解析时间范围字符串
export function parseTimeRange(timeString) {
  if (!timeString || typeof timeString !== 'string') {
    return; // 返回 undefined
  }

  const timeParts = timeString.split(',');
  if (timeParts.length !== 2) {
    return; // 返回 undefined
  }

  const [startTime, endTime] = timeParts.map(part => part.trim());

  const isValidTime = (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // HH:mm格式
    return timeRegex.test(time);
  };

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return; // 返回 undefined
  }

  const now = new Date();

  const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    const date = new Date(now);
    date.setHours(hours, minutes, 0);
    return date;
  };

  return [parseTime(startTime), parseTime(endTime)];
}


// 日期格式化函数
export function formatDate(dateString) {
  const date = new Date(dateString);  // 创建日期对象

  // 检查是否能成功转换日期
  if (isNaN(date)) {
    return '';  // 如果传入的时间无效，返回空字符串
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 判断是否需要日期部分
  if (dateString.includes('T')) {
    return `${year}-${month}-${day} ${hours}:${minutes}`;  // 格式为 2025-01-02 14:47
  } else {
    return `${hours}:${minutes}`;  // 格式为 14:47
  }
}



