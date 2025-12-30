// Fireflies.ai API Service Module

const FIREFLIES_API_KEY = 'c1ef75fc-fe19-43f2-a369-905c7a0008df';
//const FIREFLIES_API_KEY = 'e4ed2fc7-d744-4a94-abda-32faa8d21b7f';
const FIREFLIES_BASE_URL = 'https://api.fireflies.ai/graphql';

/**
 * Fireflies API Service
 * Handles all API interactions with Fireflies.ai
 */
class FirefliesService {
  constructor() {
    this.apiKey = FIREFLIES_API_KEY;
    this.baseUrl = FIREFLIES_BASE_URL;
  }

  /**
   * Make a GraphQL request to the Fireflies API
   * @param {string} query - GraphQL query string
   * @param {object} variables - Query variables
   * @returns {Promise} Response data
   */
  async makeRequest(query, variables = {}) {
    const config = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    };

    try {
      const response = await fetch(this.baseUrl, config);
      
      if (!response.ok) {
        throw new Error(`Fireflies API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
      }

      return result.data;
    } catch (error) {
      console.error('Fireflies API request failed:', error);
      throw error;
    }
  }

  /**
   * Get all transcripts/meetings
   * @param {number} limit - Number of transcripts to fetch
   * @returns {Promise} List of transcripts
   */
  async getTranscripts(limit = 10) {
    const query = `
      query Transcripts($limit: Int) {
        transcripts(limit: $limit) {
          id
          title
          date
          duration
          meeting_attendees {
            displayName
            email
          }
          summary {
            overview
            action_items
          }
        }
      }
    `;

    return this.makeRequest(query, { limit });
  }

  /**
   * Get a specific transcript by ID
   * @param {string} transcriptId - Transcript ID
   * @returns {Promise} Transcript data
   */
  async getTranscript(transcriptId) {
    const query = `
      query Transcript($transcriptId: String!) {
        transcript(id: $transcriptId) {
          id
          title
          date
          duration
          meeting_attendees {
            displayName
            email
          }
          summary {
            overview
            action_items
            keywords
          }
          sentences {
            text
            speaker_name
            start_time
            end_time
          }
        }
      }
    `;

    return this.makeRequest(query, { transcriptId });
  }

  /**
   * Search transcripts by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} Search results
   */
  async searchTranscripts(keyword) {
    const query = `
      query SearchTranscripts($keyword: String!) {
        search(query: $keyword) {
          id
          title
          date
          meeting_attendees {
            displayName
          }
        }
      }
    `;

    return this.makeRequest(query, { keyword });
  }

  /**
   * Get analytics data for teams and users
   * @param {string} startTime - Start datetime in ISO 8601 format (e.g., "2024-01-01T00:00:00Z")
   * @param {string} endTime - End datetime in ISO 8601 format (e.g., "2024-12-31T23:59:59Z")
   * @returns {Promise} Analytics data
   */
  async getAnalytics(startTime, endTime) {
    const query = `
      query Analytics($startTime: String, $endTime: String) {
        analytics(start_time: $startTime, end_time: $endTime) {
          team {
            conversation {
              average_filler_words
              average_filler_words_diff_pct
              average_monologues_count
              average_monologues_count_diff_pct
              average_questions
              average_questions_diff_pct
              average_sentiments {
                negative_pct
                neutral_pct
                positive_pct
              }
              average_silence_duration
              average_silence_duration_diff_pct
              average_talk_listen_ratio
              average_words_per_minute
              longest_monologue_duration_sec
              longest_monologue_duration_diff_pct
              total_filler_words
              total_filler_words_diff_pct
              total_meeting_notes_count
              total_meetings_count
              total_monologues_count
              total_monologues_diff_pct
              teammates_count
              total_questions
              total_questions_diff_pct
              total_silence_duration
              total_silence_duration_diff_pct
            }
            meeting {
              count
              count_diff_pct
              duration
              duration_diff_pct
              average_count
              average_count_diff_pct
              average_duration
              average_duration_diff_pct
            }
          }
          users {
            user_id
            user_name
            user_email
            conversation {
              talk_listen_pct
              talk_listen_ratio
              total_silence_duration
              total_silence_duration_compare_to
              total_silence_pct
              total_silence_ratio
              total_speak_duration
              total_speak_duration_with_user
              total_word_count
              user_filler_words
              user_filler_words_compare_to
              user_filler_words_diff_pct
              user_longest_monologue_sec
              user_longest_monologue_compare_to
              user_longest_monologue_diff_pct
              user_monologues_count
              user_monologues_count_compare_to
              user_monologues_count_diff_pct
              user_questions
              user_questions_compare_to
              user_questions_diff_pct
              user_speak_duration
              user_word_count
              user_words_per_minute
              user_words_per_minute_compare_to
              user_words_per_minute_diff_pct
            }
            meeting {
              count
              count_diff
              count_diff_compared_to
              count_diff_pct
              duration
              duration_diff
              duration_diff_compared_to
              duration_diff_pct
            }
          }
        }
      }
    `;

    return this.makeRequest(query, { startTime, endTime });
  }

  /**
   * Get analytics for a specific user by name or email
   * @param {string} userName - User's name to match
   * @param {string} startTime - Start datetime in ISO 8601 format
   * @param {string} endTime - End datetime in ISO 8601 format
   * @returns {Promise} User-specific analytics
   */
  async getUserAnalytics(userName, startTime, endTime) {
    const data = await this.getAnalytics(startTime, endTime);
    
    if (!data.analytics || !data.analytics.users) {
      return null;
    }

    // Find user by name or email
    const user = data.analytics.users.find(u => 
      u.user_name?.toLowerCase().includes(userName.toLowerCase()) ||
      u.user_email?.toLowerCase().includes(userName.toLowerCase())
    );

    return user || null;
  }
}

// Create and export a singleton instance
const firefliesService = new FirefliesService();

export default firefliesService;
