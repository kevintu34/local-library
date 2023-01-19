// FIND ()
function findAccountById(accounts=[], id="") {
  return accounts.find((account)=>account.id===id)
}

function sortAccountsByLastName(accounts=[]) {
  return accounts.sort((accountA,accountB)=>{
    //TERNARY OPERATOR
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  })
}

//DESTRUCTURED PARAMETER, HELPER FUNCTION, ARROW FUNCTION EXPRESSION
let filteredBooks = ({id}={}, books=[]) => { //HELPER FUNCTION
  let filtered = books.filter((book) => { //create a filtered book array
    //look for account.id in book.borrows.id
      //book borrows -> object.values -> includes account.id?
    let bookValues = Object.values(book.borrows) //turn each book.borrow into array of values (id)
    return bookValues.some((borrowID) => { //loop through book id's comparing against account id
      return borrowID.id === id
    })
  })
  return filtered
}

function getTotalNumberOfBorrows({id}={}, books=[]) {
  return filteredBooks({id},books).length
}


// MAP() // FILTER ()
function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  let userFilteredList = filteredBooks(account, books) //creates filtered list of ALL books checked out by accountID using helper function
  //creates checkedOut array by filtering book.borrows[0].id to match account id AND book.borrows[0].returned is false
  //we use [0] because the returned is always stored in index 0
  let checkedOut = userFilteredList.filter((book) => {
      if(book.borrows[0].id === account.id && book.borrows[0].returned === false) {
          return book
      }
  })
  //creates a result array using map in order to add the author obj to our results
  let results = checkedOut.map((book)=>{
    //loops through the author list, if the book.authorID matches an authorID, a new KVP will be added to the 'book' element
      authors.forEach((author) => {
          if(author.id === book.authorId) {
              book['author'] = author
          }
      })
      return book
      })
  
  return results
  }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
