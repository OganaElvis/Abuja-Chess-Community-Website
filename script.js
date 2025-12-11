'use strict'
// basic interactions: modal, year, simple form handling, Menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu')
hamburger.addEventListener('click', function(){
  const openMenu = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', openMenu)
})
const images = document.querySelectorAll('.gallery-container img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentIndex = 0;
images.forEach(function(img, index){
  img.addEventListener('click', function(){
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImage.src = images[currentIndex].src;
  });
});

const showImage = function(index){
  if(index < 0){
    currentIndex = images.length - 1;
  } 
  else if(index >= images.length) {
    currentIndex = 0;
  } 
  else {
    currentIndex = index;
  }

  lightboxImage.src = images[currentIndex].src;
}

nextBtn?.addEventListener('click', function(e){
  e.stopPropagation();
  showImage(currentIndex + 1);
});

prevBtn?.addEventListener('click', function(e){
  e.stopPropagation();
  showImage(currentIndex - 1);
});

closeBtn?.addEventListener('click', function(){
  lightbox.style.display = 'none';
});

lightbox?.addEventListener('click', function(e){
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // populate year
  const y = new Date().getFullYear();
  document.querySelectorAll('.year').forEach(function(el){
    el.textContent = y});

  // modal open/close
  const joinBtn = document.getElementById('join-btn');
  const joinCta = document.getElementById('join-cta');
  const modal = document.getElementById('join-modal');
  const close = document.getElementById('close-join');

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    // focus first input
    modal.querySelector('input,select,textarea').focus();
  }

 const closeModal = function(){
  modal.setAttribute('aria-hidden', 'true');
 }

  joinBtn?.addEventListener('click', openModal);
  joinCta?.addEventListener('click', openModal);
  close?.addEventListener('click', closeModal);
  modal?.addEventListener('click', function(event){
  if(event.target === modal){
    closeModal()
  }
  })
 
  const joinForm = document.getElementById('join-form');
  if(joinForm){
    joinForm.addEventListener('submit', function(event){
      event.preventDefault();

      const formData = new FormData(joinForm);

      fetch(joinForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      })
      .then(function (response){
        if (response.ok){
          alert("Thanks, " + formData.get("name") + "! We will contact you soon.");
          joinForm.reset();
          closeModal();
        }
        else{
          alert("Oops! Something went wrong. Please try again.");
        }
      })
      .catch(function (error){
        alert("Error: " + error.message);
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch("https://formspree.io/f/mqayprdg", {
        method:"POST",
        body:formData,
        headers:{"Accept":"application/json"} 
      })
      .then(function(response){
        if(response.ok){
          alert(`Thank you for contacting Abuja Chess Community ${formData.get('name')}!
          We would get back to you shortly.
          Have a great day! `); 
          contactForm.reset();
        }
        else{
          alert(`Oops! Something went wrong. Please try again`);
        }
      })
      .catch(function(error){
        alert(`Error: ${error.message}`);
      })
    });
  }
});




