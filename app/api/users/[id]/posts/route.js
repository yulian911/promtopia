import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const Promts = await Prompt.find({ creator: params.id }).populate('creator')
    return new Response(JSON.stringify(Promts), { status: 200 })
  } catch (error) {
    return new Response('Failed to get all prompts', { status: 500 })
  }
}
