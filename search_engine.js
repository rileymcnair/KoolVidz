const DB = require('./database')
const DAL = require('./data_access_layer')

const MAX_SEARCH_WORDS = 10

class SE {
  // See search-engine-algo.txt for details
  static async search (search_str) {
    const db = new DB()
    db.connect()

    let results = []

    // Exact string matches
    results = results.concat(await DAL.search_video(db, [search_str], true))
    results = results.concat(await DAL.search_video(db, [search_str], false))

    // Get word combinations
    search_str = search_str.trim()
    const words = search_str.split(/\b\s+\b/).slice(0, MAX_SEARCH_WORDS)
    let combinations = new Array(1 << words.length).fill().map((e1, i) => words.filter((e2, j) => i & 1 << j))

    // Sort by most words and remove zero length arrays
    combinations.sort((a, b) => b.length - a.length)
    combinations = combinations.filter(arr => arr.length > 0)

    // Word combination matches
    for (const combination of combinations) {
      results = results.concat(await DAL.search_video(db, combination, true))
    }
    for (const combination of combinations) {
      results = results.concat(await DAL.search_video(db, combination, false))
    }

    db.close()

    // Ensure video ids are unique
    const results_unique = []
    for (const result of results) {
      let is_present = false
      for (const unique_result of results_unique) {
        is_present = is_present || result.id == unique_result.id
      }

      if (!is_present) {
        results_unique.push(result)
      }
    }

    return results_unique
  }
}

module.exports = SE
