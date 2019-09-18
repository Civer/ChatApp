# NoSQL Database Object

## Chat

```

{
    chatId:         int,
    chatUser1:      int,
    chatUser2:      int,
    userName1:      string,
    userName2:      int,
    state:          int,    //Definition of states for sent, read and maybe failed missing
    creationDate:   date,   //For information purpose
    lastPostdate:   date
}

```

## Messages

```
{
    messageId:  int,
    message:    string,
    userId:     int,
    userName:   string,
    chatId:     int,
    state:      int,    //Definition of states for sent, read and maybe failed missing
    timeStamp:  date,
}
```
