# README


## usersテーブル
デバイスgemを使用して作成  
  
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, default, unique: true|
|encrypted_password|string|null: false, default|


### Association
- has_many :group_users  
- has_many :groups, through: :group_users  
- has_many :messages  

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :group_users  
- has_many :users, through: :group_users  
- has_many :messages  
   
## messagesテーブル
 
 |Column|Type|Options|
 |------|----|-------|
 |body|text|null: false|
 |image|string||
 |group_id|references|foreign_key: true, index: true|
 |user_id|references|foreign_key: true, index: true| 
 |timestamps|||
   
 ### Association
- belongs_to :users  
- belongs_to :groups
  
  
 ## group_usersテーブル
 
 |Column|Type|Options|
 |------|----|-------|
 |user_id|references|foreign_key: true, null: false, index: true| 
 |group_id|references|foreign_key: true, null: fals, index: true| 
   
 ### Association
- belongs_to :users  
- belongs_to :groups