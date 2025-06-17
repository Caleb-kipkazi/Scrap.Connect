// // Home.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Message Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'green',
//   },
// });

// import React, { useState, useCallback, useEffect } from 'react';
// import { View, Text, StyleSheet, Picker } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';

// export default function Messaging() {
//   const [selectedChatWith, setSelectedChatWith] = useState('admin');
//   const [messages, setMessages] = useState([]);

//   // Mock chat participants
//   const chatPartners = {
//     admin: {
//       _id: 2,
//       name: 'Centre Admin',
//       avatar: 'https://placeimg.com/140/140/tech',
//     },
//     collector: {
//       _id: 3,
//       name: 'Assigned Collector',
//       avatar: 'https://placeimg.com/140/140/people',
//     },
//   };

//   // Initial mock message (reset when switching recipient)
//   useEffect(() => {
//     const defaultMessage = {
//       _id: 1,
//       text: `Hi! This is the ${selectedChatWith === 'admin' ? 'Admin' : 'Collector'}. How can I help you today?`,
//       createdAt: new Date(),
//       user: chatPartners[selectedChatWith],
//     };
//     setMessages([defaultMessage]);

//     // 👇 BACKEND: When integrated, replace above with:
//     // fetch(`/api/messages/conversation?user1=homeownerId&user2=partnerId`)
//     //   .then(res => res.json())
//     //   .then(data => setMessages(data));
//   }, [selectedChatWith]);

//   const onSend = useCallback((newMessages = []) => {
//     setMessages(prev => GiftedChat.append(prev, newMessages));

//     // 👇 BACKEND: Send message to database here
//     /*
//     fetch('/api/messages/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         senderId: 'homeowner123',
//         receiverId: selectedChatWith === 'admin' ? 'admin456' : 'collector789',
//         message: newMessages[0].text,
//         senderRole: 'homeowner',
//         receiverRole: selectedChatWith
//       })
//     });
//     */
//   }, [selectedChatWith]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chat With:</Text>

//       <Picker
//         selectedValue={selectedChatWith}
//         style={styles.picker}
//         onValueChange={(value) => setSelectedChatWith(value)}
//       >
//         <Picker.Item label="Centre Admin" value="admin" />
//         <Picker.Item label="Assigned Collector" value="collector" />
//       </Picker>

//       <View style={styles.chatContainer}>
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: 1,
//             name: 'Homeowner',
//           }}
//           placeholder="Type your message..."
//           showUserAvatar
//           renderUsernameOnMessage
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6f5ea', // Light green background
//     paddingTop: 20,
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 15,
//     marginBottom: 5,
//     color: '#1b5e20', // Dark green
//   },
//   picker: {
//     height: 50,
//     marginHorizontal: 15,
//     marginBottom: 10,
//     backgroundColor: '#ffffff',
//     color: '#1b5e20',
//     borderRadius: 8,
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     marginHorizontal: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
// });

// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, StyleSheet} from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { Picker } from '@react-native-picker/picker';
// import PropTypes from 'prop-types';
// import { useNavigation } from '@react-navigation/native';


// export default function Messaging({ currentUser }) {
//   const [recipientRole, setRecipientRole] = useState('');
//   const [recipientId, setRecipientId] = useState('');
//   const [recipient, setRecipient] = useState(null);
//   const [availableRecipients, setAvailableRecipients] = useState([]);
//   const [messages, setMessages] = useState([]);

//   const users = {
//     admin: [{ id: 'admin1', name: 'Centre Admin', avatar: 'https://placeimg.com/140/140/tech' }],
//     collectors: [
//       { id: 'collector1', name: 'James Collector', avatar: 'https://placeimg.com/140/140/people' },
//       { id: 'collector2', name: 'Mercy Collector', avatar: 'https://placeimg.com/141/141/people' }
//     ],
//     homeowners: [
//       { id: 'homeowner1', name: 'Alice Homeowner', assignedTo: 'collector1', avatar: 'https://placeimg.com/140/140/nature' },
//       { id: 'homeowner2', name: 'Brian Homeowner', assignedTo: 'collector2', avatar: 'https://placeimg.com/141/141/nature' }
//     ]
//   };

//   useEffect(() => {
//     let list = [];

//     if (recipientRole === 'admin') {
//       list = users.admin;
//     } else if (recipientRole === 'collector') {
//       if (currentUser.role === 'admin' || currentUser.role === 'homeowner') {
//         list = users.collectors;
//       }
//     } else if (recipientRole === 'homeowner') {
//       if (currentUser.role === 'admin') {
//         list = users.homeowners;
//       } else if (currentUser.role === 'collector') {
//         list = users.homeowners.filter(h => h.assignedTo === currentUser.id);
//       }
//     }

//     setAvailableRecipients(list);
//     setRecipientId('');
//     setRecipient(null);
//     setMessages([]);
//   }, [recipientRole]);

//   const handleSelectRecipient = (id) => {
//     const selected = availableRecipients.find(user => user.id === id);
//     setRecipient(selected);
//     setRecipientId(id);

//     // Mock messages
//     setMessages([
//       {
//         _id: 1,
//         text: `Hi, this is ${selected.name}. How can I help you?`,
//         createdAt: new Date(),
//         user: {
//           _id: selected.id,
//           name: selected.name,
//           avatar: selected.avatar,
//         },
//       }
//     ]);

//     // 👇 BACKEND: Replace with fetch to GET /api/messages/conversation
//   };

//   const onSend = useCallback((newMessages = []) => {
//     setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));

//     // 👇 BACKEND: POST to /api/messages/send
//     /*
//     fetch('/api/messages/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         senderId: currentUser.id,
//         receiverId: recipientId,
//         message: newMessages[0].text,
//         senderRole: currentUser.role,
//         receiverRole: recipientRole
//       })
//     });
//     */
//   }, [recipientId, recipientRole]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.mainHeader}>Let's Chat</Text>

//       <Text style={styles.label}>Send To (Role):</Text>
//       <Picker
//         selectedValue={recipientRole}
//         style={styles.picker}
//         onValueChange={(val) => setRecipientRole(val)}
//       >
//         <Picker.Item label="-- Select Role --" value="" />
//         {currentUser.role !== 'admin' && <Picker.Item label="Admin" value="admin" />}
//         {(currentUser.role === 'admin' || currentUser.role === 'homeowner') && (
//           <Picker.Item label="Scrap Collector" value="collector" />
//         )}
//         {(currentUser.role === 'admin' || currentUser.role === 'collector') && (
//           <Picker.Item label="Homeowner" value="homeowner" />
//         )}
//       </Picker>

//       {recipientRole !== '' && (
//         <>
//           <Text style={styles.label}>Select Recipient:</Text>
//           <Picker
//             selectedValue={recipientId}
//             style={styles.picker}
//             onValueChange={handleSelectRecipient}
//           >
//             <Picker.Item label="-- Select User --" value="" />
//             {availableRecipients.map(user => (
//               <Picker.Item label={user.name} value={user.id} key={user.id} />
//             ))}
//           </Picker>
//         </>
//       )}

//       <View style={styles.chatContainer}>
//         <GiftedChat
//           messages={messages}
//           onSend={newMessages => onSend(newMessages)}
//           user={{
//             _id: currentUser.id,
//             name: currentUser.name,
//             avatar: currentUser.avatar || 'https://placeimg.com/142/142/people',
//           }}
//           placeholder="Type your message..."
//           showUserAvatar
//           renderUsernameOnMessage
//         />
//       </View>
//     </View>
//   );
// }

// // Sample default props
// MessagingGifted.defaultProps = {
//   currentUser: {
//     id: 'collector1',
//     name: 'James Collector',
//     role: 'collector',
//     avatar: 'https://placeimg.com/142/142/people',
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6f5ea',
//     paddingTop: 20,
//   },
//   mainHeader: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#1b5e20',
//     marginLeft: 15,
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1b5e20',
//     marginLeft: 15,
//     marginTop: 10,
//   },
//   picker: {
//     marginHorizontal: 15,
//     marginBottom: 10,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 8,
//     color: '#1b5e20',
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     marginHorizontal: 10,
//     marginBottom: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
// });
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Messaging() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});