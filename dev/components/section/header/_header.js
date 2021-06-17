Modules.header = function header(){
   //BURGER SCRIPT
   const iconMenu = document.querySelector('.menu-icon')
   const navMenu = document.querySelector('.nav')
   const header = document.querySelector('.header')
   const menu = document.querySelector('.menu__icon')

   menu.addEventListener('click', function(){
      menu.classList.toggle('_active')
   })

   iconMenu.addEventListener('click', function(){
      document.body.classList.toggle('_frozen')
      iconMenu.classList.toggle('_active')
      navMenu.classList.toggle('_active')
   })


   window.addEventListener('scroll', () => {
      if (pageYOffset > 80){
         header.classList.add('_scroll')
      }
      else {
         header.classList.remove('_scroll')
      }
   })
}