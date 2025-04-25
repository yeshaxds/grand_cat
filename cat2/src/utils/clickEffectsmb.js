/**
 * 点击特效工具函数集
 * 提供鼠标点击时的猫咪emoji和爪印特效
 */

// 创建猫咪emoji点击特效
export function createCatEmojiEffect(x, y) {
  // 定义猫咪表情数组
  const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '👿'];
  // 要显示的表情数量(随机3-5个)
  const emojiCount = Math.floor(Math.random() * 3) + 3;
  
  // 创建多个表情
  for (let i = 0; i < emojiCount; i++) {
    let emoji = document.createElement('div');
    
    // 随机选择一个表情
    emoji.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
    
    // 为每个表情设置略微不同的位置(围绕点击点散开)
    const offsetX = Math.random() * 60 - 30; // -30到30像素的随机偏移
    const offsetY = Math.random() * 60 - 30;
    
    emoji.style.position = 'fixed';
    emoji.style.left = `${x + offsetX}px`;
    emoji.style.top = `${y + offsetY}px`;
    emoji.style.fontSize = `${25 + Math.random() * 15}px`; // 随机大小(25-40px)
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '9999';
    emoji.style.transform = 'translate(-50%, -50%)';
    
    // 为每个表情设置略微不同的动画速度和方向
    const duration = 1 + Math.random(); // 1-2秒的随机持续时间
    emoji.style.animation = `emojiFloat ${duration}s ease-out forwards`;
    
    document.body.appendChild(emoji);
    
    // 设置定时器移除元素
    setTimeout(() => {
      emoji.remove();
    }, duration * 1000); // 根据动画持续时间设置
  }
}
// 创建爪印特效
export function createPawPrint(x, y) {
  const pawPrint = '🐾';

  let randomIndex = Math.floor(Math.random()*4) + 3;
  for (let i = 0; i<randomIndex;i++){
    const paw = document.createElement('div');
    paw.textContent = pawPrint;
    const offsetX = Math.random() * 40 - 20;
    const offsetY = Math.random() * 40 - 20;
    // 设置样式，位置有随机偏移以增加自然感
    paw.style.position = 'fixed';
    paw.style.left = `${x + offsetX}px`;
    paw.style.top = `${y + offsetY}px`;
    paw.style.fontSize = `${25 + Math.random() * 15}px`;
    paw.style.opacity = '0.7';
    paw.style.animation = 'pawFade 2s forwards';
    document.body.appendChild(paw);
    // 定时移除元素
    setTimeout(() => paw.remove(), 2000);
  }
}

// 保存点击事件处理函数的引用，以便后续可以移除
let clickHandler = null;

// 添加全局点击监听器
export function setupClickEffects() {
  // 如果已经有处理函数，先移除它，防止重复添加
  if (clickHandler) {
    removeClickEffects();
  }
  
  // 创建新的处理函数
  clickHandler = (e) => {
    createCatEmojiEffect(e.clientX, e.clientY);

    // 50%概率生成爪印
    if (Math.random() > 0.5) {
      createPawPrint(e.clientX, e.clientY);
    }
  };
  // 添加到全局点击事件
  window.addEventListener('click', clickHandler);
}

// 移除全局点击监听器
export function removeClickEffects() {
  if (clickHandler) {
    window.removeEventListener('click', clickHandler);
    clickHandler = null;
  }
} 