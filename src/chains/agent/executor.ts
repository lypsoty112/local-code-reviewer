import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";
import { Annotation } from "@langchain/langgraph";
import { fileReaderTool } from "../../tools/read-file-tool";


const model = new ChatAnthropic({
  model: "claude-3-5-haiku-latest",
});




const agentExecutor = createReactAgent({
  llm: model,
  tools: [fileReaderTool]
})