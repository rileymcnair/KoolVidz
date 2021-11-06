const DB = require('./database')

class DAL {
  static async create_video (title, description) {
    const query = 'INSERT INTO videos (title, description) values ($1, $2) RETURNING id'
    const values = [title, description]
    const result = await new DB().query(query, values)

    return result.rows[0].id
  }

  static async get_video (video_id) {
    const query = 'SELECT * FROM videos WHERE id = $1'
    const values = [video_id]
    const result = await new DB().query(query, values)

    return result.rows[0]
  }

  static async search_video (search_query) {

  }

  static async increment_video_views (video_id) {
    const query = 'UPDATE videos SET views = views + 1 WHERE id = $1'
    const values = [video_id]
    await new DB().query(query, values)
  }

  static async create_rating (video_id, is_like, ip_address) {
    const query = 'INSERT INTO ratings (video_id, is_like, ip_address) values ($1, $2, $3) RETURNING id'
    const values = [video_id, is_like, ip_address]
    const result = await new DB().query(query, values)

    return result.rows[0].id
  }

  static async get_video_ratings (video_id) {
    const likes_query = 'SELECT COUNT(*) FROM ratings WHERE video_id = $1 and is_like = TRUE'
    const values = [video_id]
    const likes_result = await new DB().query(likes_query, values)
    const likes = likes_result.rows[0].count

    const dislikes_query = 'SELECT COUNT(*) FROM ratings WHERE video_id = $1 AND is_like = FALSE'
    const dislikes_result = await new DB().query(dislikes_query, values)
    const dislikes = dislikes_result.rows[0].count

    return likes - dislikes
  }

  static async has_rating (video_id, ip_address) {
    /*
            null: No rating
            false: Dislike rating
            true: Like rating
        */
    const query = 'SELECT is_like FROM ratings WHERE video_id = $1 AND ip_address = $2'
    const values = [video_id, ip_address]
    const result = await new DB().query(query, values)

    if (result.rowCount == 0) {
      return null
    }

    return result.rows[0].is_like
  }

  static async delete_rating (video_id, ip_address) {
    const query = 'DELETE FROM ratings WHERE video_id = $1 AND ip_address = $2'
    const values = [video_id, ip_address]
    await new DB().query(query, values)
  }

  static async create_comment (video_id, content) {
    const query = 'INSERT INTO comments (video_id, content) values ($1, $2) RETURNING id'
    const values = [video_id, content]
    const result = await new DB().query(query, values)

    return result.rows[0].id
  }

  static async get_video_comments (video_id) {
    const query = 'SELECT * FROM comments WHERE video_id = $1'
    const values = [video_id]
    const result = await new DB().query(query, values)

    return result.rows
  }
}

module.exports = DAL
