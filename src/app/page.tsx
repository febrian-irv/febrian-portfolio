"use client";

import Header from '@/app/components/Header';
import Image from 'next/image';
import Link from 'next/link'
import { SiTailwindcss } from 'react-icons/si';
import { SiExpress } from 'react-icons/si';
import { SiFastapi } from 'react-icons/si';
import { SiScikitlearn } from "react-icons/si";
import { SiHuggingface } from 'react-icons/si';
import { SiNextdotjs } from "react-icons/si";
import { SiLangchain } from "react-icons/si";
import { GiClick } from "react-icons/gi";
import { useState, useRef, useEffect } from "react";
import { PiRobotFill } from "react-icons/pi";
import { IoIosMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to Febrian's portfolio site! I'm here to guide you through projects Febrian have completed or even share a bit about Febrian. Whether you’re curious about the technologies Febrian worked with or the story behind it, I’ve got all the answers.",
      sender: 'Assistant',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null); 
  const [showShortcuts, setShowShortcuts] = useState(true);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const updatedMessages = [
      ...messages,
      { text: newMessage, sender: 'User' },
    ];
    setMessages(updatedMessages);
    setNewMessage('');
    setShowShortcuts(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: newMessage,
          conversation_history: updatedMessages.map(
            (msg) => `${msg.sender}: ${msg.text}`
          ).join('\n'),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.response, sender: 'Assistant' },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, an error occurred. Please try again.', sender: 'Assistant' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const handleShortcutClick = (shortcutMessage: string) => {
    const updatedMessages = [
      ...messages,
      { text: shortcutMessage, sender: 'User' },
    ];
    setMessages(updatedMessages);
    setShowShortcuts(false);
    setIsLoading(true);
  
    fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_message: shortcutMessage,
        conversation_history: updatedMessages.map(
          (msg) => `${msg.sender}: ${msg.text}`
        ).join('\n'),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: 'Assistant' },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching response:', error);
        setMessages((prev) => [
          ...prev,
          { text: 'Sorry, an error occurred. Please try again.', sender: 'Assistant' },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-2 gap-6 md:gap-4 lg:gap-6 md:pb-16 lg:pb-20">
        <div className="relative col-span-1 md:col-span-2 lg:col-span-3 row-span-1 flex justify-center border-[0.5px] border-gray-200 rounded-[14px] transition-transform duration-500 hover:scale-105 group">
          <div className="absolute inset-0 bg-gray-300 rounded-[14px] opacity-20 pointer-events-none"></div>

          <div className="relative flex flex-col md:flex-row p-6 items-center justify-center gap-4 md:gap-6">
            <Image className='rounded-full' src='/images/pp.jpg' alt='profile picture' width={150} height={150} />
            <div>
              <h2 className='text-3xl'>Hi!</h2>
              <p className='font-lato font-light text-base'>My name is <span className='font-medium'>Febrian Irvansyah</span>, Computer Science student with interest in Web Development and Generative Artificial Intelligence.</p>
              <div className='flex flex-wrap font-lato font-light text-sm gap-2 pt-2'>
                <p className="relative border-[0.5px] border-black px-3 bg-gradient-to-r from-rose-900 to-blue-900 rounded-full">📍 Jakarta</p>
                <p className="relative border-[0.5px] border-black px-3 bg-gradient-to-r from-rose-900 to-blue-900 rounded-full">🎓 Universitas Indonesia</p>
                <p className="relative border-[0.5px] border-black px-3 bg-gradient-to-r from-rose-900 to-blue-900 rounded-full">🧑‍💻 Fullstack Developer</p>
                <p className="relative border-[0.5px] border-black px-3 bg-gradient-to-r from-rose-900 to-blue-900 rounded-full">🌏 English & Indonesian</p>
              </div>
            </div>
          </div>
        </div>

        <Link href={"/projects"} className="relative col-span-1 md:col-span-2 row-span-2 border-[0.5px] border-gray-200 rounded-[14px] transition-transform duration-500 hover:scale-105 flex flex-col items-center gap-4 p-4 group cursor-pointer">
          
          <div className="absolute inset-0 z-0 bg-gray-300 rounded-[14px] opacity-20 pointer-events-none"></div>

          <div className="flex absolute top-2 right-2 z-10 text-sm font-lato font-light gap-1 transition-opacity duration-300 items-center">
            <GiClick/> See Projects 
          </div>


          <h2 className='text-xl mb-1'>Projects</h2>

          <div className="relative z-10 w-[230px] h-[150px] group-hover:scale-105 transition-transform items-center duration-500 ease-in-out">
            <div className="relative">
              <Image 
                src='/images/suma.svg' 
                alt='uigtr-web' 
                width={300} 
                height={150} 
                className="absolute left-8 bottom-4 inset-0 w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[230px] group-hover:-translate-y-4 group-hover:translate-x-6 transition-all duration-500 ease-in-out object-contain"
              />

              <Image 
                src='/images/uigtr.svg' 
                alt='uigtr-web' 
                width={300} 
                height={150} 
                className="absolute top-4 right-8 inset-0 w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[230px] group-hover:translate-y-4 group-hover:-translate-x-6 transition-all duration-500 ease-in-out object-contain"
              />
            </div>
          </div>
          <p className='font-lato font-light text-base mt-2 text-center'>
            Experienced in building dynamic websites and actively experimenting with AI technologies, with a proven ability to solve real-world challenges.
          </p>

          <h2 className='text-xl'>My Tech Stacks</h2>

          <div className='grid z-10 grid-cols-2 gap-y-2 gap-x-6 font-lato font-light'>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiNextdotjs className='text-white' size={24} />
                  Next.js
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiTailwindcss className='text-sky-400' size={24} />
                  Tailwind CSS
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiExpress className='text-gray-400' size={24} />
                  Express.js
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiFastapi className='text-green-400' size={24} />
                  FastAPI
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiScikitlearn className='text-orange-400' size={24} />
                  scikit-learn
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiHuggingface className='text-yellow-400' size={24} />
                  Hugging Face
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <SiLangchain className='text-green-700' size={24} />
                  Langchain
              </div>
              <div className='flex bg-gradient-to-r from-rose-900 to-blue-900 border-[0.5px] border-black rounded-md p-2 gap-2 hover:scale-105 duration-300'>
                  <BiLogoPostgresql className='text-cyan-900' size={24} />
                  PostgreSQL
              </div>
          </div>
      </Link>


      <div className="relative col-span-1 md:col-span-2 row-span-1 border-[0.5px] border-gray-200 rounded-[14px] transition-transform duration-500 hover:scale-105 h-[50vh] md:h-[40vh] lg:h-[38vh]">
        <div className="absolute inset-0 bg-gray-300 rounded-[14px] opacity-20 pointer-events-none" />
        <div className="relative h-full flex flex-col justify-between p-4 gap-2 rounded-[14px]">
          <h2 className="flex items-center justify-center gap-1 text-lg">
            Febrian&apos;s PortoBot <PiRobotFill />
          </h2>

          <div
            className="flex-1 overflow-y-auto space-y-4 pr-2 font-lato font-light scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            ref={chatBoxRef}
          >
            {/* Pinned Cold Start Message */}
            <div className="w-full flex justify-center">
              <div className="bg-gray-200/70 text-gray-600 text-xs py-2 px-4 rounded-lg w-[90%] text-center">
                ⚠️ The first chat may be slower due to a cold start to optimize costs.
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full ${message.sender === 'Assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl border border-gray-300 p-3 text-xs 
                    ${message.sender === 'Assistant' ? 'bg-blue-700/10' : 'bg-rose-700/30 text-white'}`}
                >
                  {/* Format numbered and bold text */}
                  {message.text.split('\n').map((line, i) => {
                    const numberedLine = line.match(/^(\d+\.)\s(.*)$/);
                    const boldText = line.match(/\*\*(.*?)\*\*/g);

                    if (numberedLine) {
                      return (
                        <p key={i} className="ml-4 text-xs">
                          <span className="font-medium">{numberedLine[1]}</span>{' '}
                          {numberedLine[2]}
                        </p>
                      );
                    }

                    if (boldText) {
                      return (
                        <p key={i} className="text-xs">
                          {line.split(/\*\*(.*?)\*\*/).map((part, j) =>
                            j % 2 === 1 ? (
                              <span key={j} className="font-medium">{part}</span>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }

                    return <p key={i}>{line}</p>;
                  })}
                </div>
              </div>
            ))}

            {showShortcuts && (
              <div className="flex gap-2 ml-2 mt-4 justify-start">
                {[`Febrian's Tech Stack?`, `Tell me about Febrian's projects`].map(
                  (shortcut, index) => (
                    <button
                      key={index}
                      onClick={() => handleShortcutClick(shortcut)}
                      className="px-3 py-2 bg-gradient-to-r from-rose-900 to-blue-900 text-white border-[0.5px] border-black hover:scale-105 duration-300 rounded-full text-[10px]"
                    >
                      {shortcut}
                    </button>
                  )
                )}
              </div>
            )}

            {isLoading && <div className="self-start text-gray-400">PortoBot is typing...</div>}
          </div>

          <div className="flex h-[48px] mt-auto">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type here..."
              className="flex-grow border border-gray-300 rounded-l-xl py-2 px-4 text-sm text-black font-lato font-light outline-none"
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="border border-gray-300 px-4 rounded-r-xl cursor-pointer"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>


        <div className="relative col-span-1 md:col-span-1 row-span-1 border-[0.5px] border-gray-200 rounded-[14px] h-full transition-transform duration-500 hover:scale-105 p-4">
          <div className="absolute z-1 inset-0 bg-gray-300 rounded-[14px] opacity-20 pointer-events-none"></div>
          <h2 className='flex z-10 items-center justify-center text-lg'>Connect</h2>
          <div className='flex flex-col justify-center items-stretch gap-4 mt-6'>
            <Link href={"https://mail.google.com/mail/?view=cm&fs=1&to=febrian.irv@gmail.com&su=Reaching%20out%20after%20checking%20out%20your%20site!"} target='_blank' className='flex z-10 cursor-pointer bg-gradient-to-r from-rose-900 to-blue-900 items-center justify-center gap-2 p-2 border-black border-[0.5px] font-lato font-light rounded-md hover:scale-105 duration-100'><IoIosMail />Email</Link>
            <Link href={"https://github.com/febrian-irv"} target='_blank' className='flex z-10 cursor-pointer bg-gradient-to-r from-rose-900 to-blue-900 items-center justify-center gap-2 p-2 border-black border-[0.5px] font-lato font-light rounded-md hover:scale-105 duration-100'><FaGithub/>GitHub</Link>
            <Link href={"https://linkedin.com/in/febrian-irvansyah"} target='_blank' className='flex z-10 cursor-pointer bg-gradient-to-r from-rose-900 to-blue-900 items-center justify-center gap-2 p-2 border-black border-[0.5px] font-lato font-light rounded-md hover:scale-105 duration-100'><FaLinkedin className='text-white'/>LinkedIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
