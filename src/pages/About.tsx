const About = () => {
  return (
    <>
      <div className="bg-white/10 flex shadow-2xl rounded-xl flex-col gap-4 items-start max-w-[800px] w-full p-3">
        <h2 className="text-center text-xl w-full">About</h2>
        <section className="flex gap-2 flex-col">
          <p>
            Budding Messenger is a modern messaging app for connecting with
            friends, sharing messages, and building conversations in a vibrant,
            user-friendly environment.
          </p>
          <hr />
          <p className="text-center">
            Share a tree that grows with the health of your conversations
          </p>
          <div className="flex items-end overflow-auto">
            <img src="/tree10.png" alt="" className="w-auto h-fit" />
            <img src="/tree20.png" alt="" className="w-auto h-fit" />
            <img src="/tree40.png" alt="" className="w-auto h-fit" />
            <img src="/tree80.png" alt="" className="w-auto h-fit" />
            <img src="/tree160.png" alt="" className="w-auto h-fit" />
          </div>
          <hr />
          <p>
            As you interact with other Budding Messenger users and your
            conversation fills with messages the tree you share will grow based
            on the messages you contribute to the conversation.
          </p>
        </section>
        <h2 className="text-center text-xl w-full">FAQs</h2>
        <section className="flex gap-2 flex-col">
          <p className="flex gap-1">
            <span className="text-bold h-fit bg-lime-200 py-1 px-2 rounded-md">
              Q:
            </span>
            Why isn't our tree growing? My friend and I have shared lots of
            messages together!
          </p>
          <div className="flex gap-1">
            <span className="text-bold h-fit bg-blue-200 py-1 px-2 rounded-md">
              A:
            </span>
            <div className="flex flex-col gap-2">
              <p>
                The growth of your tree depends on how many messages you've
                shared along with the tone of your conversation.
              </p>
              <p>
                When messages are sent, the emoji displayed will indicate the
                tone of the message.
              </p>
              <p>
                For your tree to grow the amount of messages as well as average
                tone across all messages is taken into account.
              </p>
              <ol className="list-disc ml-4">
                <li key="neutral">
                  A 😐 emoji indicates a message with a neutral tone
                </li>
                <li key="positive">
                  A 😃 emoji indicates a message with a positive tone
                </li>
                <li key="negative">
                  A 😡 emoji indicates a message with a negative tone
                </li>
              </ol>
              <p>
                When a conversation has lots of messages and they are mostly
                positive you can expect to see your tree grow!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
