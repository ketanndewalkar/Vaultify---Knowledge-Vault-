import OpenAi from "openai"

const client = new OpenAi({
    apiKey:"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",
    baseURL: "https://openrouter.ai/api/v1", 
})

export const llmCall = async (message) =>{
    try {
        const res = await client.chat.completions.create({
            model:"openai/gpt-oss-120b",
            messages:[...message]
        })
        console.log(typeof(res.choices[0].message.content),":",res.choices[0].message.content)
        return res.choices[0].message.content
    } catch (error) {
        console.log("Error inside llmCall:", error)
        throw error;
    }
}