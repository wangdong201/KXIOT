import './dark/styls.scss';
import './blue/styls.scss';
// 默认主题
export const defaultTheme = 'blue';
export const themeList = [
  {name: '深黑', key: 'dark'},
  {name: '蓝色', key: 'blue'}
];

export const setThemenew = (themeName = defaultTheme) => {
  if (themeName === 'theme-light') {
    if (document.body.className) document.body.className = ''
  } else  {
    // 把该主题的所有属性存到缓存
    document.body.className = 'dark';
  }
}



