import { Model, Table, Column, DataType } from "sequelize-typescript";

// Define the Task model
@Table({
  tableName: Task.TASK_TABLE_NAME,
})
export class Task extends Model {
  public static TASK_TABLE_NAME = "task" as string;
  public static TASK_ID = "id" as string;
  public static TASK_TITLE = "title" as string;
  public static TASK_IS_COMPLETED = "isCompleted" as string;

  // Define the primary key ID column
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Task.TASK_ID,
  })
  id!: number;

  // Define the title column
  @Column({
    type: DataType.STRING(100),
    field: Task.TASK_TITLE,
  })
  title!: string;

  // Define the isCompleted column
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, // Default value for new tasks
    field: Task.TASK_IS_COMPLETED,
  })
  isCompleted!: boolean;
}
