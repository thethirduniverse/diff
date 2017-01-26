# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170126234632) do

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "edits", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "version"
    t.text     "message"
    t.text     "patch"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "post_id"
  end

  create_table "events", force: :cascade do |t|
    t.string   "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "type"
    t.integer  "report_id"
    t.index ["report_id"], name: "index_events_on_report_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.string   "code"
    t.integer  "user_id"
    t.boolean  "used"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_invitations_on_code"
    t.index ["user_id"], name: "index_invitations_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "user_id"
    t.integer  "count"
    t.integer  "status"
    t.datetime "modified_at"
    t.index ["event_id"], name: "index_notifications_on_event_id"
    t.index ["modified_at"], name: "index_notifications_on_modified_at"
    t.index ["status"], name: "index_notifications_on_status"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text     "title"
    t.text     "content"
    t.integer  "view",           default: 0
    t.integer  "root_post_id"
    t.integer  "parent_post_id"
    t.integer  "creator_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "upvote_count",   default: 0, null: false
    t.integer  "last_edit_id"
    t.index ["creator_id"], name: "index_posts_on_creator_id"
    t.index ["parent_post_id"], name: "index_posts_on_parent_post_id"
    t.index ["root_post_id"], name: "index_posts_on_root_post_id"
  end

  create_table "posts_categories", id: false, force: :cascade do |t|
    t.integer "category_id"
    t.integer "post_id"
    t.index ["category_id"], name: "index_posts_categories_on_category_id"
    t.index ["post_id"], name: "index_posts_categories_on_post_id"
  end

  create_table "reports", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "creator_id"
    t.string   "content"
    t.string   "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "post_id"
    t.integer  "edit_id"
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id", "user_id"], name: "index_upvotes_on_post_id_and_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "confirmation_token"
    t.time     "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer  "invited_by"
    t.text     "bio"
    t.string   "first_name"
    t.string   "last_name"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
