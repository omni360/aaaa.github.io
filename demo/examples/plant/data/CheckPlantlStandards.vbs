'/*--------------------------------------------------------------------------------------+
'|
'|    $RCSfile: CheckPlantlStandards.vbs,v $
'|   $Revision: 1.1 $
'|       $Date: 2008/07/30 19:58:27 $
'|
'|  $Copyright: (c) 2008 Bentley Systems, Incorporated. All rights reserved. $
'|
'+--------------------------------------------------------------------------------------*/

Main

    '/*---------------------------------------------------------------------------------**//**
    '* @bsimethod                                                    Bentley         02/2006
    '+---------------+---------------+---------------+---------------+---------------+------*/
    Sub Main
        on error resume next	
        Dim programPath, workspacePath
        Call findHighestVersionedProduct (programPath, workspacePath)
        
        Const WS_HiddenWindow = 0, WS_ShowWindow   = 1
        Const R_Asynch        = 0, R_Wait          = 1

        if Not programPath = Null Then 
	msgbox "Unable to find programPath."
	exit sub
        end if

        if Not workspacePath = Null Then 
	msgbox "Unable to find workspacePath."
	exit sub
        end if

        Dim cmd : cmd = ""
        cmd = cmd + programPath + "ustation.exe"
        cmd = cmd + " -wuExamples -wpPlant -waBatchprocess"
        cmd = cmd + " -I" + workspacePath + "Projects\Examples\General\data\checkstandards.bprc"

        Dim WshShell          : set WshShell = CreateObject("Wscript.Shell")
        Dim seqExitStatus     : seqExitStatus = "" : seqExitStatus = WshShell.Run (cmd, WS_ShowWindow, R_Wait)
        'msgbox cmd
    End sub
        
    '/*---------------------------------------------------------------------------------**//**
    '* @bsimethod                                                    Bentley         02/2006
    '+---------------+---------------+---------------+---------------+---------------+------*/
    Sub findHighestVersionedProduct(    ByRef programPath,    ByRef workspacePath    ) 
        ' Discover the installed MicroStations from the registry
        const HKEY_LOCAL_MACHINE = &H80000002
         
        On Error Resume Next
        Dim oReg : Set oReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\default:StdRegProv")
         
        Dim regPath : regPath = "Software\Bentley\MicroStation"
        Dim arrSubKeys
        call oReg.EnumKey (HKEY_LOCAL_MACHINE, regPath, arrSubKeys)

	Dim highestVersion : highestVersion = ""
        Dim subKey
        For Each subkey In arrSubKeys
            If (highestVersion < subkey) Then
 		highestVersion = subkey
            End If
        Next
        
    Call oReg.GetStringValue (HKEY_LOCAL_MACHINE, regPath+"\"+highestVersion, "ProgramPath",   programPath)
    Call oReg.GetStringValue (HKEY_LOCAL_MACHINE, regPath+"\"+highestVersion, "WorkspacePath", workspacePath)
    End sub
