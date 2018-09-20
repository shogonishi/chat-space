# README


## usersテーブル
デバイスgemを使用して作成  
  
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, default|
|encrypted_password|string|null: false, default|


### Association
- has_many :groups, through: :group_users  
- has_many :group_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :users, through: :group_users  
- has_many :group_users  
- accepts_nested_attributes_for :group_users  
   
   
 ## messagesテーブル
 
 |Column|Type|Options|
 |------|----|-------|
 |body|text|null: false, unique: true, index: true|
 |image|string||
 |group|references|foreign_key: true|
 |user|references|foreign_key: true| 
 |timestamps|||
   
 ### Association
- belongs_to :user  
- belongs_to :group
  
  
 ## group_usersテーブル
 
 |Column|Type|Options|
 |------|----|-------|
 |user|references|foreign_key: true, null: false| 
 |group|references|foreign_key: true, null: false| 
   
 ### Association
- belongs_to :user  
- belongs_to :group