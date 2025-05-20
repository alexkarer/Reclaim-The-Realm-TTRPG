# Reclaim the Realm Foundry VTT System

This is an implementation of Reclaim the Realm for the Foundry VTT.

### Local Testing

In order for efficient testing it makes sense to create a symbolic link to your local foundry folder.
Additionally common_resources are required 

**Windows:**
`mklink /J  {USER_FOLDER}\AppData\Local\FoundryVTT\Data\systems\reclaim-the-realm {LINK_TO_THIS_REPO}\Reclaim-The-Realm-TTRPG\foundry-vtt\reclaim-the-realm`

`mklink /D {LINK_TO_THIS_REPO}\Reclaim-The-Realm-TTRPG\foundry-vtt\reclaim-the-realm\common_resources {LINK_TO_THIS_REPO}\Reclaim-The-Realm-TTRPG\common_resources`