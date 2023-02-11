// Your Code Here

let bookContainer = document.getElementById("root");
async function displayBooks() {
  let response = await fetch("http://localhost:3001/listBooks"); //Request sent to server and usually takes some time 
  let books = await response.json();
  console.log(books);
  books.forEach((book) => {
    bookContainer.innerHTML += `<span>${book.title}</span><input  id=${book.id} type="text" value=${book.quantity}><button type="submit">save</button><br>`;
  });

  let buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {              //Click function is added 
      updateQuantity(                                            //Updating specific book
        Number(e.target.previousSibling.id),
        e.target.previousSibling.value
      );
    });
  });
}

displayBooks();

async function updateQuantity(id, quantity) {                    //Updated quantity for books
  let response = await fetch("http://localhost:3001/updateBook", {
    method: "PATCH",                                             //Update method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({                                       // Convert object to JSON 
      id: id,
      quantity: quantity,
    }),
  });

  let data = await response.json();
  console.log(data); 
}




