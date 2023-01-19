function findAuthorById(authors=[], id="") {
  return authors.find((author)=>author.id === id)
}

function findBookById(books=[], id="") {
  return books.find((book)=>book.id === id)
}

function partitionBooksByBorrowedStatus(books=[]) {
  //loop through every book in the books array
  let checkedOut = []
  let returned = []
  books.forEach((book) => {
  //look at books[key].borrows[0].returned
  if(book.borrows[0].returned) {        //not books.book b/c already in element
    //if true, books[key] into returned
    returned.push(book)
  }
    //if false, books[key] into checkedOut
  else {
    checkedOut.push(book)
  }
  //combine the two arrays and return
  })
  return [checkedOut, returned] //return has to be after the loop
}

function getBorrowersForBook({borrows}={}, accounts=[]) {
  //given a book, return the account objects that have borrowed the book and add the 'returned' KVP to the object
  //loop through book.borrows for the first 10 borrowers
  let borrowers = []
  for (let i=0; i < borrows.length && i <= 9; i++) {
  //loop through accounts array for a matching id to book.borrows.id
  let accountMatch = accounts.find((account)=>{ //returns the account id that matches the borrow id
    return account.id === borrows[i].id
  })
  accountMatch['returned'] = borrows[i].returned
  //add their objects into a "borrowers" array
  //console.log(accountMatch)
  borrowers.push(accountMatch)
  //add the book.borrows.returned KVP into the array
  //loop to the next one
  }
  //return borrowers array
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
