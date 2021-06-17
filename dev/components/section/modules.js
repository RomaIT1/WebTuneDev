let Modules = {
   animation(){
      const elAnimal = {
         welcome: {
            section: document.querySelector('.welcome'),
            el: document.querySelectorAll('.welcome .animation'),
         },

         client: {
            section: document.querySelector('.client'),
            el: document.querySelectorAll('.client .animation'),
         },

         strategy: {
            section: document.querySelector('.strategy'),
            el: document.querySelectorAll('.strategy .animation'),
         },
         
         task: {
            section: document.querySelector('.task'),
            el: document.querySelectorAll('.task .animation'),
         },


         result: {
            section: document.querySelector('.result'),
            el: document.querySelectorAll('.result .animation'),
         },
         
         offers: {
            section: document.querySelector('.offers'),
            el: document.querySelectorAll('.offers .animation'),
         },
      }     

      //const y = elements[i].getBoundingClientRect().y - document.body.offsetHeight + 20
      //console.log(document.querySelectorAll('.client .animation'),)

      function checkAnimal(){
         
         for (let i in elAnimal){
            const ySection = elAnimal[i].section.getBoundingClientRect().y - document.body.offsetHeight + 20

            if (ySection < 0){
               for (let a of elAnimal[i].el){
                  const yEl = a.getBoundingClientRect().y - document.body.offsetHeight + 20

                  if (yEl < 0){
                     a.classList.add('animation-active')
                  }
                  else {
                     a.classList.remove('animation-active')
                  }
               }
            }
            else {
               break
            }
         }
      }

      document.addEventListener('scroll', checkAnimal)

      checkAnimal()
   }
}

