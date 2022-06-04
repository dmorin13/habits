const deleteBtns = document.querySelectorAll(".delete-habit");
//put into an array? 
deleteBtns.forEach(btn => btn.addEventListener("click", () => {
  const habitName = btn.getAttribute("data-name");

  fetch('/deleteHabit', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      habit: habitName
    })
  }).then(function (response) {
    window.location.reload()
  })
}));


//how to toggle star property 'off' and 'on' in DOM and DB  ?  
const starHabit = document.querySelectorAll(".star-habit");


Array.from(starHabit).forEach(function(star){
  star.addEventListener('click', function(){
    // get the habit identifier out of the attribute
    const habitName = star.getAttribute("data-name")
    const isStarred = star.classList.contains("star-on");

    const updateBody = {
      'habit': habitName,
      'starred': !isStarred,
    };

    console.log({isStarred, updateBody});

    // Update the state of the the star
    star.classList.toggle('star-on');

    // Update the state of the star on the server
    fetch('/habitList', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBody)
    })
  })
})

 
  // fetch('/habitList', {
  //   method: 'put',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'habit':habit,
  //     'starred': true,
  //   })
  // }).then(function (response) {
  //   console.log(response)
  //   window.location.reload(true)
  // })
// }));

//how to target each particular checkbox for each habit and day of the week? (generate id/ name dynamically with EJS syntax )
// const checkHabit = document.querySelector("[name]");
// const habitsChecked = document.querySelector('checkHabit:checked')

// access checked property= returns a boolean value 
// checkHabit:checked
// if true= checked
// not checked = false 

// Array.from(checkHabit).forEach(function(check){
//   check.addEventListener('click', function(){
//     console.log(check);
//   check.classList.toggle('checked-off');

//      fetch('/editHabitList', {
//           method: 'put',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'habit':habit,
//             'checked': true,
//           })
//         }).then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(function (response) {
//           console.log(response)
//           // window.location.reload(true)
//         })
//     })  
//   })
// })

//  have message change for each habit input? or overall progress for all habits?
//  const message = document.querySelector('.messageDisplay')
//  if(habitsChecked <= 3){
//      message.innerText="You're on track! Keep it Up!"
//    }else{
//      message.innerText="Not quite there yet, take 1 day at a time!"
//    } 2