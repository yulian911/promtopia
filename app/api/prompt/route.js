import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (req, res) => {
  try {
    await connectToDB()
    const Promts = await Prompt.find().populate('creator')
    return new Response(JSON.stringify(Promts), { status: 200 })
  } catch (error) {
    return new Response('Failed to get all prompts', { status: 500 })
  }
}
