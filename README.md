### -----MySql数据库操作基础-----

### 1.显示数据库
show databases;

### 2.判断是否存在数据库wpj1105,有的话先删除
drop database if exists xxx;

### 3.创建数据库
create database xxx;

### 4.删除数据库
drop database xxx;

### 5.使用该数据库
use xxx;

### 6.显示数据库中的表
show tables;

### 7.先判断表是否存在,存在先删除
drop table if exists student;

### 8.创建表
create table student(
id int auto_increment primary key,
name varchar(50),
sex varchar(20),
date varchar(50),
content varchar(100)
)default charset=utf8;

### 9.删除表
drop table student;

### 10.查看表的结构
describe student;  #可以简写为desc student;

### 11.插入数据
insert into student values(null,'aa','男','1988-10-2','......');
insert into student values(null,'bb','女','1889-03-6','......');
insert into student values(null,'cc','男','1889-08-8','......');
insert into student values(null,'dd','女','1889-12-8','......');
insert into student values(null,'ee','女','1889-09-6','......');
insert into student values(null,'ff','null','1889-09-6','......');
### 12.查询表中的数据
select * from student;
select id,name from student;

### 13.修改某一条数据
update student set sex='男' where id=4;

### 14.删除数据
delete from student where id=5;

### 15. and 且
select * from student where date>'1988-1-2' and date<'1988-12-1';

### 16. or 或
select * from student where date<'1988-11-2' or date>'1988-12-1';
   
### 17.between
select * from student where date between '1988-1-2' and '1988-12-1';

### 18.in 查询制定集合内的数据
select * from student where id in (1,3,5);

### 19.排序 asc 升序  desc 降序
select * from student order by id asc;

### 20.分组查询 #聚合函数 
select max(id),name,sex from student group by sex;

select min(date) from student;

select avg(id) as '求平均' from student;

select count(*) from student;   #统计表中总数

select count(sex) from student;   #统计表中性别总数  若有一条数据中sex为空的话,就不予以统计~

select sum(id) from student;

### 21.查询第i条以后到第j条的数据(不包括第i条)
select * from student limit 2,5;  #显示3-5条数据

### 22.修改数据 
update c set age=66 where id=2;
update c set name='花花',age=21,sex='女' where id=2
delete from c where age=21;

### 23.常用查询语句
select name,age ,id from c
select * from c where age>40 and age<60;  #and
select * from c where age<40 or age<60;  #or
select * from c where age between 40 and 60 #between
select * from c where age in (30,48,68,99);     #in 查询指定集合内的数据
select * from c order by age desc;      #order by （asc升序 des降序）

### 24.分组查询
select name,max(age) from c group by sex;  #按性别分组查年龄最大值
### 25.聚合函数
select min(age) from c;
select avg(age) as '平均年龄 ' from c;
select count(*) from c;  #统计表中数据总数
select sum(age) from c;

### 26.修改表的名字
alter table tbl_name rename to new_name
alter table c rename to a;
 
### 27.表结构修改
create table test
(
id int not null auto_increment primary key, #设定主键
name varchar(20) not null default 'NoName', #设定默认值
department_id int not null,
position_id int not null,
unique (department_id,position_id) #设定唯一值
);

### 28.修改表的名字
alter table tbl_name rename to new_name

### 29.向表中增加一个字段(列)
alter table test add  columnname varchar(20);

### 30.修改表中某个字段的名字
alter table test change name uname varchar(50);


### 31.表position 增加列test
alter table position add(test char(10));
### 32.表position 修改列test
alter table position modify test char(20) not null;
### 33.表position 修改列test 默认值
alter table position alter test set default 'system';
### 34.表position 去掉test 默认值
alter table position alter test drop default;
### 35.表position 去掉列test
alter table position drop column test;
### 36.表depart_pos 删除主键
alter table depart_pos drop primary key;
### 37.表depart_pos 增加主键
alter table depart_pos add primary key PK_depart_pos
(department_id,position_id);

### 38.用文本方式将数据装入数据库表中（例如D:/mysql.txt）
load data local infile "D:/mysql.txt" into table MYTABLE;

### 39.导入.sql文件命令（例如D:/mysql.sql）
source d:/mysql.sql;  #或者  /. d:/mysql.sql;