import { useState, useEffect } from 'react'

const QuoteCollection = () => {
  // Sample quotes to start with
  const defaultQuotes = [
    { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", favorite: false },
    { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", favorite: false },
    { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", favorite: false }
  ]

  // TODO: Initialize quotes state with defaultQuotes or from localStorage
  const [quotes, setQuotes] = useState(defaultQuotes)
  const [newQuote, setNewQuote] = useState({ text: '', author: '' })
  const [showFavorites, setShowFavorites] = useState(false)

  // TODO: Load quotes from localStorage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('quotes')
    if (savedQuotes) {
      // Parse and set quotes from localStorage
    }
  }, [])

  // TODO: Save quotes to localStorage whenever they change
  useEffect(() => {
    // Save quotes to localStorage
  }, [quotes])

  // TODO: Function to add a new quote
  const addQuote = (e) => {
    e.preventDefault()
    if (newQuote.text.trim() && newQuote.author.trim()) {
      const quote = {
        id: Date.now(),
        text: newQuote.text,
        author: newQuote.author,
        favorite: false
      }
      // TODO: Add the new quote to the quotes array
      // Reset the form
      setNewQuote({ text: '', author: '' })
    }
  }

  // TODO: Function to delete a quote
  const deleteQuote = (id) => {
    // Use filter to remove the quote with matching id
  }

  // TODO: Function to toggle favorite status
  const toggleFavorite = (id) => {
    // Use map to update the favorite status of the quote with matching id
  }

  // TODO: Get random quote
  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      return quotes[randomIndex]
    }
    return null
  }

  // TODO: Filter quotes based on showFavorites
  const displayedQuotes = showFavorites 
    ? quotes.filter(quote => quote.favorite)
    : quotes

  // TODO: Count favorite quotes using reduce
  const favoriteCount = quotes.reduce((count, quote) => {
    // Return count + 1 if quote is favorite, otherwise return count
    return count
  }, 0)

  const [randomQuote, setRandomQuote] = useState(null)

  return (
    <div className="quote-collection">
      {/* Add Quote Form */}
      <form onSubmit={addQuote} className="quote-form">
        <input
          type="text"
          value={newQuote.text}
          onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
          placeholder="Enter quote..."
          className="quote-input"
        />
        <input
          type="text"
          value={newQuote.author}
          onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
          placeholder="Author..."
          className="quote-author-input"
        />
        <button type="submit" className="quote-add-btn">
          Add Quote
        </button>
      </form>

      {/* Filter and Random Quote Buttons */}
      <div className="quote-controls">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="quote-filter-btn"
        >
          {showFavorites ? 'Show All' : `Show Favorites (${favoriteCount})`}
        </button>
        <button
          onClick={() => setRandomQuote(getRandomQuote())}
          className="quote-random-btn"
        >
          Random Quote
        </button>
      </div>

      {/* Random Quote Display */}
      {randomQuote && (
        <div className="random-quote">
          <blockquote>
            "{randomQuote.text}"
            <cite>- {randomQuote.author}</cite>
          </blockquote>
        </div>
      )}

      {/* Quotes List */}
      <div className="quotes-list">
        {displayedQuotes.length === 0 ? (
          <p className="no-quotes">
            {showFavorites ? 'No favorite quotes yet' : 'No quotes in collection'}
          </p>
        ) : (
          displayedQuotes.map(quote => (
            <div key={quote.id} className="quote-item">
              <blockquote>
                "{quote.text}"
                <cite>- {quote.author}</cite>
              </blockquote>
              <div className="quote-actions">
                <button
                  onClick={() => toggleFavorite(quote.id)}
                  className={`quote-favorite ${quote.favorite ? 'active' : ''}`}
                >
                  {quote.favorite ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => deleteQuote(quote.id)}
                  className="quote-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QuoteCollection