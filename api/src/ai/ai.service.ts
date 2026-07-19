import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async rewriteBullet(bullet: string, jobDescription: string): Promise<{ rewritten: string }> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert resume writer. Rewrite resume bullets to match job descriptions, emphasizing relevant skills and impact metrics.',
          },
          {
            role: 'user',
            content: `Job Description:\n${jobDescription}\n\nCurrent Bullet:\n${bullet}\n\nRewrite this resume bullet to better match the job description. Keep it concise and impactful.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const rewritten = response.choices[0]?.message?.content || '';
      return { rewritten };
    } catch (error) {
      throw new HttpException(
        'Failed to rewrite bullet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateCoverLetter(
    jobTitle: string,
    companyName: string,
    jobDescription: string,
  ): Promise<{ coverLetter: string }> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert cover letter writer. Generate professional, personalized cover letters that highlight relevant skills and experience.',
          },
          {
            role: 'user',
            content: `Generate a professional cover letter for:
\nJob Title: ${jobTitle}
Company: ${companyName}
Job Description: ${jobDescription}

Make it compelling, specific to the role, and 3-4 paragraphs long.`,
          },
        ],
        max_tokens: 500,
        temperature: 0.8,
      });

      const coverLetter = response.choices[0]?.message?.content || '';
      return { coverLetter };
    } catch (error) {
      throw new HttpException(
        'Failed to generate cover letter',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
