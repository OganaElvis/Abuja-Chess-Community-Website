'use strict'
// basic interactions: modal, year, simple form handling
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
 
  // Join form handling (simple client-side validation)
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

  // contact form stubbing
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
