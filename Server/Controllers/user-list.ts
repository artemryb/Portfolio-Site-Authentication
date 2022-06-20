import express from 'express';
import { CallbackError } from 'mongoose';

// import the User Model
import User from '../Models/user';

import { UserDisplayName } from '../Util';

export function DisplayUserListPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
    User.find(function(err, usersCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      res.render('index', { title: 'User List', page: 'user-list', users: usersCollection, displayName: UserDisplayName(req)  });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void
{
  res.render('index', { title: "Add", page: 'user-add', messages: req.flash("addUserMessage"), displayName: UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void
{
  let id = req.params.id;

  // pass the id to the db and read the user into the edit page
  User.findById(id, {}, {}, function(err, userToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: "Edit", page: 'user-edit', user: userToEdit, displayName: UserDisplayName(req) })
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new User to Add
  let newUser = new User
  ({
    "username": req.body.userName,
    "EmailAddress": req.body.emailAddress,
    "DisplayName": req.body.displayName,
  });

  // Add the New User to the Database
  User.register(newUser, req.body.password, function(err)
  {
    if(err)
    {
        if(err.name == "UserExistsError")
        {
            console.error('ERROR: User Already Exists!');
            req.flash('addUserMessage', 'A user with the same name already exists!');
        }
        else
        {
            console.error(err.name); // other error
            req.flash('addUserMessage', 'Server Error');
        }
        return res.redirect('/user/add');
    }

    // if everything is ok - user has been registered
    // new user has been added -> refresh the user-list
    res.redirect('/user-list');
  });
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new User to Edit
  let updatedUser = new User
  ({
    "_id": id,
    "DisplayName": req.body.displayName,
    "username": req.body.userName,
    "EmailAddress": req.body.emailAddress,
  });

  // update the user in the database
  User.updateOne({_id: id}, updatedUser, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the user-list page
    res.redirect('/user-list');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the user
  User.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/user-list');
  });
}
