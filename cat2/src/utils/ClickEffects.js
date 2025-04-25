
//  export function createCatEmojiEffect(x, y) {
//      // 添加点击效果
//     const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐱', '🐈', '🐈‍🐷'];
//    const emoji = document.createElement('div');

//    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
   
//    emoji.style.position = 'fixed';
//    emoji.style.left = `${x}px`;
//    emoji.style.top = `${y}px`;
//    emoji.style.fontSize = '30px';
//    emoji.style.pointerEvents = 'none';
//    emoji.style.zIndex = '9999';
//    emoji.style.transform = 'translate(-50%, -50%)';
//    emoji.style.animation = 'emojiFloat 1.5s ease-out forwards';
   
//    document.body.appendChild(emoji);

//    setTimeout(() => {
//     emoji.remove()
//    }, 1500);
//  }
 
//  export function createPawPrint(x, y) {
//    const paw = document.createElement('div');
//    paw.innerHTML = '🐾';
//    paw.style.position = 'fixed';
//    paw.style.left = `${x + (Math.random() * 40 - 20)}px`;
//    paw.style.top = `${y + (Math.random() * 40 - 20)}px`;
//    paw.style.fontSize = '24px';
//    paw.style.opacity = '0.7';
//    paw.style.animation = 'pawFade 2s forwards';
//    document.body.appendChild(paw);

//    setTimeout(() => paw.remove(), 2000);
//  }

//  let clickHandler = null;

//  function setupClickEffects(){
//     if (clickHandler){
//         removeClickEffects();
//     }
//     clickHandler = (e) =>{
//         createCatEmojiEffect(e.clientx,e.clienty);

//         if (Math.random()>0.5){
//             createPawPrint(e.clientx,e.clienty)
//         }
//     };
//     window.addEventListener('click',clickHandler)
//  }

//  export function removeClickEffects(){
//     if (clickHandler){
//         window.removeEventListener('click',clickHandler);
//         clickHandler = null;
//     }
//  }