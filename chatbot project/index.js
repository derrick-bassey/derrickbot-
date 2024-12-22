import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
    console.log(colors.bold.green('welcome to derrickbot!'));
    console.log(colors.bold.green('please ask me something!'));

    const chatHistory = []; 

    while(true){
        const userInput = readlineSync.question(colors.yellow('You: '));

        try{
            // make messages based on chathistory
            const messages = chatHistory.map(([role, content]) => ({ role, content }));

            // add latest user input to chathistory
            messages.push({role: 'user', content: userInput})

            //call chatgpt API 
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
              });
              const completionText = completion.data.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit'){
                console.log(colors.green('Bot: ') + completionText);n
                return;
            }
            console.log(colors.green('Bot: ') + completionText);

            // update chathistory log with user input and derrickbot responce
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        }catch (error){
            console.error(colors.red(error));
        }
    }

}

main();