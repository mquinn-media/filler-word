// Fireflies.ai API Service Module

const FIREFLIES_API_KEY = 'c1ef75fc-fe19-43f2-a369-905c7a0008df';
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
}

// Create and export a singleton instance
const firefliesService = new FirefliesService();

export default firefliesService;
