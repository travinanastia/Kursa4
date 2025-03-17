/** @format */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// MUI Components
import { Avatar, CircularProgress } from '@mui/material';
import { deepOrange, green } from '@mui/material/colors';

// React Icons
import { IoFastFood } from 'react-icons/io5';
import { AiFillRobot } from 'react-icons/ai';

// Hooks
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

// Redux & API
import { useAiGetRecipeMutation } from '../../features/recipe/recipeApiSlice';

// Custom Components
import { Button, Input } from '../../components';

const initialState = { aiPrompt: '' };
export default function AiRecipe() {
  useTitle('Gazdyna - Ai Recipe');

  const [aiGetRecipe, { isLoading }] = useAiGetRecipeMutation();
  const user = useAuth();
  const [history, setHistory] = useState([]);

  const pushToHistory = (message) => {
    setHistory((prev) => [...prev, message]);
  };

  const [state, setState] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    const message = state.aiPrompt;
    pushToHistory(new Message(state.aiPrompt, MESSAGE_TYPES.USER));
    setState(initialState);

    try {
      const response = await aiGetRecipe({ message });
      pushToHistory(new Message(response.data.data, MESSAGE_TYPES.AI));
    } catch (error) {
      pushToHistory(new Message('Oops, something went wrong.', MESSAGE_TYPES.AI, true));
      console.error(error);
    }
  };

  useEffect(() => {
    const onEnter = (event) => {
      const { key } = event;

      if (key === 'Enter') {
        onSubmit();
      }
    };
    window.addEventListener('keydown', onEnter);
    return () => window.removeEventListener('keydown', onEnter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.aiPrompt]);

  return (
    <div className='h-full flex flex-col px-10 '>
      {history.length === 0 && <EmptyMessage />}

      {/* messages */}
      <div className='flex-1 basis-0 '>
        {history.map((message, index) => (
          <MessageRow key={index} message={message} userAvatar={user.profilePicture} />
        ))}

        {isLoading && (
          <div className={'w-full p-3 flex'}>
            <LoadingMessage />
          </div>
        )}
      </div>

      {/* controllers */}
      <div className='w-full h-fit flex gap-2 items-end  '>
        <Input
          fullWidth
          type={'text'}
          icon={<IoFastFood />}
          id={'aiPrompt'}
          handleChange={onChange}
          value={state.aiPrompt}
          label={'Enter the ingredients'}
          placeholder={'Ingredients'}
        />

        <Button content={'Send'} customCss={'w-fit rounded text-sm px-3'} handleClick={onSubmit} loading={isLoading} />
      </div>
    </div>
  );
}

const EmptyMessage = () => {
  const message = 'No messages yet. Start the conversation!';

  return (
    <div className=' h-full flex items-center  justify-center text-gray-500 py-4'>
      <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.05 }}>
        {message.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
};

const MessageRow = ({ message, userAvatar }) => {
  const isUserMessage = message.type === MESSAGE_TYPES.USER;

  return (
    <div className={`w-full p-3 flex ${isUserMessage ? 'justify-end' : null}`}>
      <ChatMessage message={message} isUserMessage={isUserMessage} userAvatar={userAvatar} />
    </div>
  );
};

const LoadingMessage = () => {
  return (
    <div className={'flex max-w-[60%] items-center gap-2'}>
      <Avatar sx={{ bgcolor: green[400] }}>
        <AiFillRobot />
      </Avatar>
      <CircularProgress size={30} />
    </div>
  );
};

const ChatMessage = ({ message, isUserMessage, userAvatar }) => {
  return (
    <div
      className={`flex max-w-[60%] items-center gap-2 ${isUserMessage ? 'flex-row-reverse' : null} ${
        message.isError ? 'bg-red-300 p-3 border rounded-md' : null
      }`}
    >
      {isUserMessage ? (
        <Avatar sx={{ bgcolor: isUserMessage ? deepOrange[500] : green[400] }} src={userAvatar} />
      ) : (
        <Avatar sx={{ bgcolor: isUserMessage ? deepOrange[500] : green[400] }}>
          <AiFillRobot />
        </Avatar>
      )}
      {isUserMessage ? (
        <p>{message.text}</p>
      ) : (
        <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.05 }}>
          {message.text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: index * 0.01 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </div>
  );
};

const MESSAGE_TYPES = {
  USER: 'USER',
  AI: 'AI',
};

class Message {
  constructor(text, type, isError = false) {
    this.text = text;
    this.type = type;
    this.isError = isError;
  }
}
