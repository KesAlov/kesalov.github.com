int TFormMain::analog()

{

int a;

for(int i=0;i<mass;i++)

{

if(m[i]=="")

{

a=i;

break;

}

}

return a;

} 

void __fastcall TFormMain::ServerSocketClientConnect(TObject *Sender,

      TCustomWinSocket *Socket)

{

Timer1->Enabled=true;

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::Timer1Timer(TObject *Sender)

{

if(ServerSocket->Socket->ActiveConnections!=0)

for(int i=0;i<ServerSocket->Socket->ActiveConnections;i++)

ServerSocket->Socket->Connections[i]->SendText("8714"+online());

Timer1->Enabled=false;

}



//---------------------------------------------------------------------------

AnsiString TFormMain::online()

{

char str[500]="";

for(int i=0;i<analog();i++)

{

strcat(str,m[i].c_str());

strcat(str,",");

}

return str;

}

void __fastcall TFormMain::ServerSocketClientRead(TObject *Sender,

      TCustomWinSocket *Socket)

{

message=Socket->ReceiveText();

time=Now().CurrentDateTime();

if(message.SubString(1,4).AnsiCompare("6141")==0)

{

m[analog()]=message.SubString(5,message.Length());

ListBox1->Clear();

for(int i=0;i<ServerSocket->Socket->ActiveConnections;i++)

{

ListBox1->Items->Add(m[i]);

}

}

else if(message.SubString(1,4).AnsiCompare("5487")==0)

{

for(int i=0;i<ServerSocket->Socket->ActiveConnections;i++)

ServerSocket->Socket->Connections[i]->SendText("8714"+online());

}

else if(message.SubString(1,4).AnsiCompare("3988")==0)

{

nametowho=message.SubString(message.AnsiPos('Й')+1,message.AnsiPos(':')-message.AnsiPos('Й')-1);

name=message.SubString(5,message.AnsiPos('Й')-5);

if(nametowho.IsEmpty()==false && (message.SubString(message.AnsiPos(':')+1,message.Length()).IsEmpty())==false)

{

ServerSocket->Socket->Connections[numer(nametowho)]->SendText("7788"+name+":"+message.SubString(message.AnsiPos(':')+1,message.Length()));

ofstream fout("chat.txt",ios::app);

fout<<time.c_str()<<"   "<<message.c_str()<<endl;

fout.close();

}

}

else if(message.SubString(1,4).AnsiCompare("5280")==0)

{

ServerSocket->Socket->Connections[numer(message.SubString(message.Pos('#')+1,message.Pos('%')-message.Pos('#')-1))]->SendText(

"6734"+message.SubString(message.Pos('%')+1,message.Length()-message.Pos('%')));

}

}

void __fastcall TFormMain::ServerSocketClientDisconnect(TObject *Sender,

      TCustomWinSocket *Socket)

{

if(ServerSocket->Socket->ActiveConnections!=0)

{

for(int i=0;i<mass;i++)

{

m[i]="";

}

TestNames();

Timer1->Enabled=true;

}

}

void __fastcall TFormMain::DrawItem(TMessage& Msg)

{

     IconDrawItem((LPDRAWITEMSTRUCT)Msg.LParam);

     TForm::Dispatch(&Msg);

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::MyNotify(TMessage& Msg)

{

    POINT MousePos;

    switch(Msg.LParam)

    {

        case WM_RBUTTONUP:

            if (GetCursorPos(&MousePos))

            {

                PopupMenu1->PopupComponent = FormMain;

                SetForegroundWindow(Handle);

                PopupMenu1->Popup(MousePos.x, MousePos.y);

            }

            else

                Show();

            break;

        case WM_LBUTTONDBLCLK:

        Show();

        break;

        default:

            break;

    }

    TForm::Dispatch(&Msg);

}

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

bool __fastcall TFormMain::TrayMessage(DWORD dwMessage)

{

   NOTIFYICONDATA tnd;

   PSTR pszTip;

   pszTip = TipText();

   tnd.cbSize          = sizeof(NOTIFYICONDATA);

   tnd.hWnd            = Handle;

   tnd.uID             = IDC_MYICON;

   tnd.uFlags          = NIF_MESSAGE | NIF_ICON | NIF_TIP;

   tnd.uCallbackMessage	= MYWM_NOTIFY;

   if (dwMessage == NIM_MODIFY)

    {

        tnd.hIcon		= (HICON)IconHandle();

        if (pszTip)

           lstrcpyn(tnd.szTip, pszTip, sizeof(tnd.szTip));

	    else

        tnd.szTip[0] = '\0';

    }

   else

    {

        tnd.hIcon = NULL;

        tnd.szTip[0] = '\0';

    }

   return (Shell_NotifyIcon(dwMessage, &tnd));

}

//---------------------------------------------------------------------------

HICON __fastcall TFormMain::IconHandle(void)

{

return (Image2->Picture->Icon->Handle);

}

//---------------------------------------------------------------------------

PSTR __fastcall TFormMain::TipText(void)

{

        return ("Office Chat");

}

//---------------------------------------------------------------------------

LRESULT IconDrawItem(LPDRAWITEMSTRUCT lpdi)

{

return 0;

}

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

void __fastcall TFormMain::FormDestroy(TObject *Sender)

{

	TrayMessage(NIM_DELETE);

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::N1Click(TObject *Sender)

{

Show();

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::N2Click(TObject *Sender)

{

Application->Terminate();

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::FormCloseQuery(TObject *Sender, bool &CanClose)

{

CanClose=false;

FormMain->Hide();

}

//---------------------------------------------------------------------------

void __fastcall TFormMain::FormCreate(TObject *Sender)

{

unsigned long Size = 256;

   char *Buffer = new char[Size];

Label5->Caption=GetUserName(Buffer, &Size);

delete [] Buffer;

}

//---------------------------------------------------------------------------
