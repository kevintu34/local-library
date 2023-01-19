function getTotalBooksCount(books=[]) {
  return books.length
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books=[]) {
  return books.filter((book)=>!book.borrows[0].returned).length
}

//FOR IN LOOP // REDUCE ()
function getMostCommonGenres(books=[]) {
  //accumulate the total amount of books for each genre
  //create an array that sorts by the total number of books in each genre
  //loop through the books array
    //look at the book.genre
  let genreListandCount = books.reduce((result, book)=>{
    if(result[book.genre]) {
      result[book.genre] += 1
    }
    else {
      result[book.genre] = 1
    }
    return result
  },{})
  let genreArray = []
  for(let genre in genreListandCount) {
    genreArray.push({name: genre, count: genreListandCount[genre]})
  }
  genreArray.sort((genreA,genreB) => genreB.count-genreA.count)
  let finalResult = []
  for(let i=0;i<5;i++){
    finalResult.push(genreArray[i])
  }
  return finalResult
}

function getMostPopularBooks(books=[]) {
  let borrowListAndCount = books.reduce((result, book)=>{
    result[book.title] = book.borrows.length
    return result
  },{})
  let bookArray = []
  for(let title in borrowListAndCount) {
    bookArray.push({name: title, count: borrowListAndCount[title]})
  }
  bookArray.sort((bookA,bookB) => bookB.count-bookA.count)
  let finalResult = []
  for(let i=0;i<5;i++){
    finalResult.push(bookArray[i])
  }
  return finalResult
}

function getMostPopularAuthors(books=[], authors=[]) {
  let borrowListAndCount = books.reduce((result, book)=>{
    result[book.title] = {count: book.borrows.length,authorId: book.authorId}
    return result
  },{})
  // console.log(borrowListAndCount)
  // console.log(borrowListAndCount['incididunt reprehenderit amet commodo'])
  //go through the author array
  let authorSumCount = []
    authors.forEach((author)=>{
      //look at the author.id
      // console.log("author id is", author.id)
      let count = 0
    //look through the borrowListAndCount
    for(let book in borrowListAndCount) {
      if(author.id === borrowListAndCount[book].authorId) {
        // console.log(`borrow count for ${book} is ${borrowListAndCount[book].count}`)
        //add to accumulator
        count += borrowListAndCount[book].count
      }
    }
    //look through the authors and add up the counts of each book by the authors's id and compile to an array
    authorSumCount.push({name: `${author.name.first} ${author.name.last}`, count: count})
    //look at the borrowListAndCount[index].authorId
    //if author.id === borrowListAndCount[index].authorId
  })
  //sort through the array by highest borrow count
  authorSumCount.sort((authorA, authorB) =>{
    return authorB.count - authorA.count 
  })
  //return the top 5 results
  let finalResult = []
  for(i=0;i<5;i++) {
    finalResult.push(authorSumCount[i])
  }
  return finalResult
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
